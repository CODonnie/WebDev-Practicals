import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Note.scss";
import {DataContext} from '../../context/DataContext';
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

const Note = ({ url }) => {

	const { setSelected, fetchData } = useContext(DataContext);
	const navigate = useNavigate();
	const location = useLocation();

	const { title, textarea } = location.state || {}

	const [data, setData] = useState({
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
        toast.success("Note created");
        setData({
          title: "",
          textarea: "",
        });
				setSelected("home");
				fetchData();
				navigate('/');
      } else {
        toast.error("an error occured");
      }
    } catch (error) {
      toast.error("kapachimeremerechipaku!");
      console.log(error);
      setData({
        title: "error brah",
        textarea: "ewo ni werey t'onshe",
      });
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
