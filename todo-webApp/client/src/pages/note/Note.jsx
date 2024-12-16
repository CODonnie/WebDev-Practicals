//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

const Note = ({ url }) => {
  const [data, setData] = useState({
    title: "",
    textarea: "",
  });

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((currData) => ({ ...currData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/note`, data);

      if (response.data.success) {
        toast.success("Note created");
      } else {
        toast.error("an error occured");
      }
    } catch (error) {
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
        <textarea
          onChange={handleData}
          name="textarea"
          rows="10"
          value={data.textarea}
          placeholder="Enter Note"
        />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default Note;

Note.propTypes = {
	url: PropTypes.string
}
