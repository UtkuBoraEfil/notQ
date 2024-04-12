import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function OutletArea() {
const [notes, setNotes] = useOutletContext();
  return (
    <div className="border border-black p-1">
      <h1 className="text-base font-medium flex  items-center px-3 py-2 ">
        {notes.title}
      </h1>

    </div>
  );
}

export default OutletArea;
