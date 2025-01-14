import React, { useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  const handlePriority = (e) => {};

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button
            onClick={props.onClose}
            className="close-button modal-header-right"
          >
            X
          </button>
        </div>

        <div className="modal-body">
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a task"
              value={input}
              name="text"
              className="task-input"
              onChange={handleChange}
            />
            <br></br>
            <button className="task-button">Add</button>
          </form>
        </div>
        <form>
          <label for="vol">Priority (between 1 and 3):</label>
          <input type="range" id="priority" name="priority" min="1" max="3" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
