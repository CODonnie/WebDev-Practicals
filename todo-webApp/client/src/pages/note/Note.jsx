import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Note.scss";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

const Note = ({ url }) => {
  const { setSelected, fetchData } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { _id, title, textarea } = location.state || {};

  const [data, setData] = useState({
    _id: _id || null,
    title: title || "",
    textarea: textarea || "",
    createdOn: "",
    type: "note",
  });

  const isTyping = data.title.trim() || data.textarea.trim();

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((currData) => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		try {
			const response = await axios.post(`${url}/api/data`, data, { withCredentials: true });

      if (response.data.success) {
        toast.success("Note created");
        setData({
          title: "",
          textarea: "",
        });
        setSelected("home");
        fetchData();
        navigate("/");
      } else {
        toast.error("an error occured");
      }
    } catch (error) {
      toast.error("kapachimeremerechipaku!");
      console.log(error);
    }
  };

  const handleRemove = async (id, type) => {
    try {
      const response = await axios.delete(`${url}/api/data`, {
				data: { _id: id, type: type },
      });
      if (response.data.success) {
        toast.success("Note deleted!");
        navigate("/");
      } else {
        toast.error(`Note not removed`);
      }
    } catch (error) {
      toast.error(`error removing data ${id}`);
      console.log(error);
    }
  };

  return (
    <div className="note">
      <div className="title">
        <input
          onChange={handleData}
          type="text"
          name="title"
          value={data.title}
          placeholder="Enter Title"
        />
        <p onClick={() => handleRemove(data._id, data.type)}>×</p>
      </div>
      <div className="textarea">
        <textarea
          onChange={handleData}
          name="textarea"
          rows="10"
          value={data.textarea}
          placeholder="Enter Note"
        />
      </div>
      {isTyping ? (
        <button className="btnStyles" onClick={handleSubmit}>
          Save
        </button>
      ) : null}
    </div>
  );
};

export default Note;

Note.propTypes = {
  url: PropTypes.string,
};
