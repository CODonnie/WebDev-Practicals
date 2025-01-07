import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
	type: { type: String, required: true },
	title: String,
	todos: Array,
	completed: Array,
	createOn: String,
})

const noteSchema = new mongoose.Schema({
	type: { type: String, required: true},
	title: String,
	textarea: String,
	createOn: String ,
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export { Todo, Note };
