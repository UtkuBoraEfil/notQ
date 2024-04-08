import React, { useState } from "react";

function UpdateArea({ addNote }) {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <div className=" w-full flex place-content-center">
      <form>
        <div>
            <input
            className="border-2 border-black flex flex-col"
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={input.title}
            />
            <textarea
            className="border-2 border-black"
            onChange={handleChange}
            name="content"
            placeholder="Take a note..."
            rows="3"
            value={input.content}
            />
        </div>
        <button
        className="border-2 border-black"
          onClick={(e) => {
            addNote(input, e);
            setInput({ title: "", content: "" });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default UpdateArea;
