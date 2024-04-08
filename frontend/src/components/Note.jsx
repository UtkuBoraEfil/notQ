import React, { useState } from "react";

function Note(props) {
  return (
    <div className="">
      <h1 className="text-base font-medium flex  items-center px-4 py-8 ">{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={(event) => {
          props.deleteNote(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
