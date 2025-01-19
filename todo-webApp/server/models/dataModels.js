import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const todoSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: String,
  todos: Array,
  completed: Array,
  createOn: { type: Date, default: Date.now },
});

const noteSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: String,
  textarea: String,
	createOn: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must be more than 8 characters"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export { Todo, Note, User };
