import React, { useEffect, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";


function App() {
  // useEffect(() => {
  //   const serverFetch = async () => {
  //     const response = await fetch("http://127.0.0.1:3000/api/v3/utkubora");
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   const serverPost = async () => {
  //     const response = await fetch("http://127.0.0.1:3000/api/v3/seks", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name: "arda", age: 31 }),
  //     });

  //     if (response.status === 200) console.log("AUTHENTICATED");
  //   };

  //   serverPost();

  //   serverFetch();
  // }, []);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/utku");
  // }, []);
  return (
    <div>
      <Link to="/register">register</Link>
      <br />
      <br />
      <Link to="/login">login</Link>
    </div>
  );
}

export default App;
