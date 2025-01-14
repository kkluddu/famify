import React, { useState, useEffect, useRef } from "react";

function TaskForm(props) {
  const [input, setInput] = useState("");

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // const createTask = (post) => {
  //   axios.post("http://localhost:3001/tasks", post).then((res) => {
  //     console.log(res);
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    // createTask({ content: input });

    setInput("");
  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Edit task"
          value={input}
          name="text"
          className="task-input"
          onChange={handleChange}
          ref={focus}
        />
        <button className="save-button">Save</button>
      </form>
    </div>
  );
}

export default TaskForm;
