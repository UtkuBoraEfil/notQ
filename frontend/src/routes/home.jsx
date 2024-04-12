import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Notes from "../routes/Notes.jsx";
import CreateArea from "../components/CreateArea.jsx";
import Note from "../components/Note.jsx";

function Home() {
  const [notes, setNotes] = useState([{ title: "", content: "" }]);
 
  const [selectedId, setSelectedId] = useState(null);
  function handleSelect(id) {
    setSelectedId(id);
  }

  useEffect(() => {
    const serverFetch = async () => {
      const response = await fetch("http://127.0.0.1:3000/api/v3/notes");
      const data = await response.json();
      console.log(data);
      for (let i = 0; i < data.notes.length; i++) {
        const newNote = {
          id: data.notes[i].id,
          title: data.notes[i].note_title,
          content: data.notes[i].note,
        };
        setNotes((prevNotes) => {
          return [...prevNotes, newNote];
        });
      }
    };

    // const res = await fetch("http://127.0.0.1:3000/api/v3/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(input),
    // });

    // const serverPost = async () => {
    //   const response = await fetch("http://127.0.0.1:3000/api/v3/seks", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name: "arda", age: 31 }),
    //   });

    //   if (response.status === 200) console.log("AUTHENTICATED");
    // };

    // serverPost();

    serverFetch();
  }, []);

  function addNote(newNote, event) {
    const serverPost = async () => {
      const response = await fetch("http://127.0.0.1:3000/api/v3/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newNote.content,
          title: newNote.title,
        }),
      });
      if (response.status === 200) console.log("NOTE ADDED");
    };
    serverPost();
    event.preventDefault();
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, event) {
    console.log(id);
    const serverPost = async () => {
      const response = await fetch("http://127.0.0.1:3000/api/v3/deletenote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 200) console.log("NOTE DELETED");
    };
    serverPost();
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className=" flex h-screen w-full">
      <div className=" w-96 bg-slate-200  border-r border-black flex flex-col px-8">
        {notes.length > 0 && (
          <ul>
            {notes.map((notes, index) => (
              <li key={index} onClick={console.log("deneme")}>
                <Link to={`home/notes/${notes.id}`}>
                  <Notes
                    key={index}
                    title={notes.title}
                    content={notes.content}
                    deleteNote={deleteNote}
                    id={notes.id}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="note" className=" flex grow shrink basis-0 w-full">
        <Outlet context={[notes, setNotes]}/>
      </div>
      {/* <CreateArea addNote={addNote} /> */}
    </div>
    // <div className="flex justify-between">
    //   <div className="self-start w-40 border flex flex-col gap">
    //     <div className=" border-2 border-black p-2">
    //       <ul>
    //         <li className=" p-2 border-2 border-black">note 1</li>
    //         <li className=" p-2 border-2 border-black">note 2</li>
    //         <li className=" p-2 border-2 border-black">note 3</li>
    //       </ul>
    //     </div>
    //     <ul>
    //       {notes.map((note) => (
    //         <li key={note.id}>
    //           <Link to={`notes/${contact.id}`}>
    //             {note.first || note.last ? (
    //               <>
    //                 {note.first} {note.last}
    //               </>
    //             ) : (
    //               <i>No Name</i>
    //             )}{" "}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //     <Link to="/">Home</Link>
    //     <Link to="notes/31">Notes</Link>
    //   </div>
    //   <div id="notes">
    //     <Outlet />
    //   </div>
    // </div>
  );
}
export default Home;
