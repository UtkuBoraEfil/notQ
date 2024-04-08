import React from "react";
import { Form } from "react-router-dom";
function Notes(props){
    return (
        <div className="border border-black p-1">
                  <h1 className="text-base font-medium flex  items-center px-3 py-2 ">{props.title}</h1>
        </div>
    );
}

export default Notes;