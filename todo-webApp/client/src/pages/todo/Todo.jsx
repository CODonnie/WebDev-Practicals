import React, { useState } from "react";
import "./Todo.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

const Todo = () => {
  const [data, setData] = useState({
    title: "",
    todos: [],
  });

  const handleTitleChanges = (value) => {
    setData((currData) => ({ ...currData, title: value }));
  };

  const handleTodoChanges = (index, value) => {
    setData((currData) => ({
      ...currData,
      todos: currData.todos.map((todo, i) => (i === index ? value : todo)),
    }));
  };

  const handleAddTodos = () => {
    setData((currData) => ({ ...currData, todos: [...currData.todos, ""] }));
  };
  const handleMinusTodos = (index) => {
    setData((currData) => ({
      ...currData,
      todos: currData.todos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="todo">
      <div className="title">
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={data.title}
          onChange={(e) => handleTitleChanges(e.target.value)}
        />
      </div>
      {data.todos.map((todo, index) => {
        return (
          <div key={index} className="checkbox-input">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
              <div className="input">
                <input
                  type="text"
                  placeholder="what todo"
                  name="title"
                  value={todo}
                  onChange={(e) => handleTodoChanges(index, e.target.value)}
                />
              </div>

            <FaMinus color="white" onClick={() => handleMinusTodos(index)} />
          </div>
        );
      })}
      <div onClick={handleAddTodos} className="add-todo">
        <FaPlus color="white" />
      </div>
    </div>
  );
};

export default Todo;
