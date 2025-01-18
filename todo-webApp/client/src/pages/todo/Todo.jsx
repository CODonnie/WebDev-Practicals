import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Todo.scss";
import { DataContext } from "../../context/DataContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Todo = ({ url }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSelected, fetchData, auth, setAuth } = useContext(DataContext);
  const { _id, title, todos, completed } = location.state || {};

  const [data, setData] = useState({
    _id: _id || null,
    title: title || "",
    todos: todos || [],
    completed: completed || [],
    createdOn: "",
    type: "todo",
  });
  const [hide, setHide] = useState(false);

  const isTyping =
    data.title.trim() || data.todos.length || data.completed.length;

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
  const handleTodoDataMove = (index) => {
    const task = data.todos.find((_, i) => i === index);
    if (task.trim() !== "") {
      setData((currData) => ({
        ...currData,
        completed: [...currData.completed, task],
        todos: currData.todos.filter((_, i) => i !== index),
      }));
    }
  };
  const handleCompletedDataMove = (index) => {
    const task = data.completed.find((_, i) => i === index);
    setData((currData) => ({
      ...currData,
      todos: [...currData.todos, task],
      completed: currData.completed.filter((_, i) => i !== index),
    }));
  };

  const handleDataSubmit = async (e) => {
    if (auth) {
      setAuth(false);
    }
    const date = new Date(Date.now());
    const now = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setData((currData) => ({
      ...currData,
      createdOn: now,
    }));

    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/data`, data);
      if (response.data.success) {
        toast.success("to-do saved");
        setData((currData) => ({
          ...currData,
          title: "",
          todos: [],
          completed: [],
          createdOn: "",
        }));
        setSelected("home");
        fetchData();
        navigate(-1);
      } else {
        toast.error("error saving to-do");
      }
    } catch (error) {
      toast.error("chikamandu");
      console.log(error);
    }
  };

  const handleRemove = async (id, type) => {
    try {
      const response = await axios.delete(`${url}/api/data`, {
        data: { _id: id, type: type },
      });
      if (response.data.success) {
        toast.success("todo list deleted");
        navigate("/");
      }
    } catch (error) {
      toast.error("error deleting todo list");
      console.log(error);
    }
  };

  return (
    <div className="todo">
      <div className="title">
        <input
          type="text"
          placeholder="Enter Title"
          value={data.title}
          onChange={(e) => handleTitleChanges(e.target.value)}
        />
        <p onClick={() => handleRemove(data._id, data.type)}>×</p>
      </div>
      {data.todos.map((todo, index) => {
        return (
          <div key={index} className="checkbox-input">
            <label className="custom-checkbox">
              <input type="checkbox" />
              <span
                onClick={() => handleTodoDataMove(index)}
                className="checkmark"
              ></span>
            </label>
            <div className="input">
              <input
                type="text"
                placeholder="what todo"
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

      {data.completed && data.completed.length > 0 ? (
        <div className="completed">
          <div className="h2">
            <h4 style={{ color: "#fff" }} onClick={() => setHide(!hide)}>
              Completed tasks
            </h4>
            <TiArrowSortedDown color="white" size={25} />
          </div>
          {hide ? (
            data.completed.map((task, index) => {
              if (task.trim() !== "") {
                return (
                  <div key={index} className="checkbox-input">
                    <label
                      style={{ backgroundColor: "darkred" }}
                      className="custom-checkbox"
                    >
                      <input type="checkbox" checked />
                      <span
                        onClick={() => handleCompletedDataMove(index)}
                        className="checkmark"
                      ></span>
                    </label>
                    <div className="input">
                      <input
                        type="text"
                        value={task}
                        style={{ textDecoration: "line-through" }}
                      />
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {isTyping ? (
        <button className="btnStyles" onClick={handleDataSubmit}>
          Save
        </button>
      ) : null}
    </div>
  );
};

export default Todo;

Todo.propTypes = {
  url: PropTypes.String,
};
