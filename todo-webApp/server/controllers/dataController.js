import { Todo, Note, User } from "../models/dataModels.js";
import genToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

//@desc - create new data(note or todo).  @route - POST/api/data
const createData = async (req, res) => {
  const userId = req.user.userId;
  if (req.body.type === "note") {
    try {
      const { _id, type, title, textarea, createdOn } = req.body;

      if (_id) {
        let note = await Note.findById({ _id });
        if (note) {
          note.type = type;
          note.title = title;
          note.textarea = textarea;
          note.createdOn = createdOn;

          await note.save();
          res.json({ success: true, message: "note updated" });
        } else {
          res.json({ success: false, message: "error updating note" });
        }
      } else {
        const note = await new Note({
          type: type,
          title: title,
          textarea: textarea,
          createdOn: createdOn,
          user: userId,
        });
        if (!note) {
          console.log("error creating note data");
        }
        await note.save();
        res.json({ success: true, message: "note created" });
      }
    } catch (error) {
      res.json({ success: false, message: `${error.message}` });
      console.log(`data(note) not created- ${error.message}`);
    }
  } else {
    try {
      const { _id, type, title, todos, completed, createdOn } = req.body;

      if (_id) {
        let todo = await Todo.findById({ _id });

        if (todo) {
          todo.type = type;
          todo.title = title;
          todo.todos = todos;
          todo.completed = completed;
          todo.createdOn = createdOn;

          await todo.save();
          res.json({ success: true, message: "todo updated" });
        } else {
          res.json({ success: false, message: "error updating todos" });
        }
      } else {
        const todo = await new Todo({
          type: type,
          title: title,
          todos: todos,
          completed: completed,
          createdOn: createdOn,
          user: userId,
        });
        if (!todo) {
          console.log("error creating todo data");
        }
        await todo.save();
        res.json({ success: true, message: "todo created" });
      }
    } catch (error) {
      res.json({ success: false, message: `${error.message}` });
      console.log("data(todo) not created");
    }
  }
};

//@desc - get user data.		@route - GET/api/data
const readData = async (req, res) => {
  const userId = req.user.userId;
  try {
    const todo = await Todo.find({ user: userId });
    const note = await Note.find({ user: userId });
    if (!todo || !note) {
      console.log("error retrieving data");
    }
    res.status(200).json({
      success: true,
      data: {
        todos: todo,
        notes: note,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: `data retrieval failed - ${error.message}`,
    });
    console.log("retrieval failed");
  }
};

//@desc - get default data(no user)
//@route - GET/api/data/default
const readDefaultData = async (req, res) => {
  try {
    const todo = await Todo.find({ user: { $exists: false } });
    const note = await Note.find({ user: { $exists: false } });
    if (!todo || !note) {
      console.log("error retrieving data");
    }
    res.status(200).json({
      success: true,
      data: {
        todos: todo,
        notes: note,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: `data retrieval failed - ${error.message}`,
    });
    console.log("retrieval failed");
  }
};

//@desc - delete data, @route - POST/api/data
const deleteData = async (req, res) => {
  const userId = req.user.userId;
  const { _id, type } = req.body;
  if (!_id) {
    console.log("invalid id");
    return res
      .status(400)
      .json({ success: false, message: "invalid id bruhh!" });
  }

  try {
		if (type === "note") {
			const note = await Note.findOne({ _id, user: userId});
      if (!note) {
        return res.status(404).json({
          success: false,
          message: "note not found or doesn't belong to user",
        });
      }
      await Note.findByIdAndDelete(_id);
    } else if (type === "todo") {
      const todo = await Todo.findOne({ _id, user: userId });
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "todo not found or doesn't belong to user",
        });
      }
      await Todo.findByIdAndDelete(_id);
    }
    res.json({
      success: true,
      message: "data deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `data not removed - ${error.message}`,
    });
    console.log("i no fit delete am");
  }
};

//---------------------authentication controller-----------------------

//@desc - create or register new user
//@route - POST/api/auth/regUser
//@access - public
const registerUser = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    console.log("check the input fields for missing/invalid data entry");
    return res
      .status(400)
      .json({ success: false, message: "missing or invalid data in field" });
  }

  const isExisting = await User.findOne({ email });
  if (isExisting) {
    console.log("email already in use");
    return res
      .status(401)
      .json({ success: false, message: "email already exist" });
  }

  try {
    const user = await new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });

    if (!user) {
      console.log("error creating user");
    }

    await user.save();
    genToken(res, user._id);
    res.status(200).json({
      success: true,
      message: "user creaated",
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error creating user - ${error.message}`,
    });
    console.log(`error creating user - ${error.message}`);
  }
};

//@desc - login user's account
//@route - POST/api/auth/user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("invalid or missing field");
    return res.status(401).json({
      success: false,
      message: "invalid or missing field",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not found");
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    if (user && (await user.comparePassword(password))) {
      const token = genToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        token,
        name: user.username,
        email: user.email,
        success: true,
        message: `user ${user.username} login successful`,
      });
    } else {
      console.log("incorrect password");
      return res
        .status(401)
        .json({ success: false, message: "incorrect password" });
    }
  } catch (error) {
    console.log(`an error occured - ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: `server error - ${error.message}` });
  }
};

//@desc - logout user's account
//@route - GET/api/auth/logout

const logoutUser = (req, res) => {
  res.clearCookie("userCookie", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  return res.status(200).json({
    success: true,
    message: "user logged out successful",
  });
};

//@desc - check if user is logged input
//@route - GET/api/auth/check

const checkUser = (req, res) => {
	const token = req.cookies.userCookie;

	if(!token) return res.json({ isAuthenticated: false });

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if(err) return res.json({ isAuthenticated: false });

		res.json({ isAuthenticated: true, user });
	})
}

export {
  createData,
  readData,
	readDefaultData,
  deleteData,
  registerUser,
  loginUser,
  logoutUser,
	checkUser,
};
