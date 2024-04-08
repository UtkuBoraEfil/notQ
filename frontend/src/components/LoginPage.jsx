import React, { useState, useEffect } from "react";
import InputArea from "./inputArea";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/home");
  }, [isLoggedIn]);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  //   useEffect(() => {
  //     const serverFetch = async () => {
  //       const response = await fetch("http://127.0.0.1:3000/api/v3/utkubora");
  //       const data = await response.json();
  //       console.log(data);
  //     };

  //     serverFetch();
  //   }, []);

  async function handleClick() {
    // setResponse({
    //   email: input.email,
    //   password: input.password,
    // });
    const res = await fetch("http://127.0.0.1:3000/api/v3/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    console.log(res);
    setInput({
      email: "",
      password: "",
    });

    if (res.status === 200) {
      console.log("Logged in");
      setLogin(true);
    } else if (res.status === 404) console.log("user not found");

    //     console.log(input);
    //     const serverPost = async () => {
    //     const response = await fetch("http://127.0.0.1:3000/api/v3/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email: input.email , password: input.password}),
    //   });
    //   setInput({
    //     email: "",
    //     password: ""
    //   })

    //   if (response.status === 200) console.log("AUTHENTICATED");
    // };
  }

  return (
    <div>
      <h1>Login</h1>
      <div className=" grid gap-2">
        <input
          className=" p-3 border-2 border-black"
          type="text"
          onChange={handleChange}
          name="email"
          placeholder="email"
        />
        <input
          className=" p-3 border-2 border-black"
          type="text"
          onChange={handleChange}
          name="password"
          placeholder="password"
        />
      </div>
      <div className=" mx-auto flex">
        <button
          onClick={handleClick}
          className=" border-2 border-black p-1 my-1 mx-auto"
        >
          click
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
