import { Todo, Note } from "../models/dataModels.js";

//@desc - create new data(note or todo).  @route - POST/api/data
const createData = async (req, res) => {
  if (req.body.type === "note") {
    try {
      const { type, title, textarea, createdOn } = req.body;

      const note = await new Note({
        type: type,
        title: title,
        textarea: textarea,
        createdOn: createdOn,
      });
      if (!note) {
        console.log("error creating note data");
      }
      await note.save();
      res.json({ success: true, message: "note created" });
    } catch (error) {
      res.json({ success: false, message: `${error.message}` });
      console.log("data(note) not created");
    }
  } else {
    try {
      const { type, title, todos, completed, createdOn } = req.body;

      const todo = await new Todo({
        type: type,
        title: title,
        todos: todos,
        completed: completed,
        createdOn: createdOn,
      });
      if (!todo) {
        console.log("error creating todo data");
      }
      await todo.save();
      res.json({ success: true, message: "todo created" });
    } catch (error) {
      res.json({ success: false, message: `${error.message}` });
      console.log("data(todo) not created");
    }
  }
};

//@desc - get all data.		@route - GET/api/data
const readData = async (req, res) => {
  try {
    const todo = await Todo.find({});
    const note = await Note.find({});
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

//@desc - delete data, @route - DELETE/api/data
const deleteData = async (req, res) => {
  const { _id, type } = req.body;
  if (!_id) {
    console.log("invalid id");
    res.json({ success: false, message: "invalid id bruhh!" });
  }

  try {
    if (type === "note") {
      await Note.findByIdAndDelete(_id);
    } else {
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

export { createData, readData, deleteData };
