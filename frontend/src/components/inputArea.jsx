import React, { useEffect, useState } from "react";

function InputArea(props) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //   const [response, setResponse] = useState({
  //     email: "",
  //     password: "",
  //   });

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
    const res = await fetch("http://127.0.0.1:3000/api/v3/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    setInput({
      email: "",
      password: "",
    });

    if (res.status === 200) console.log("AUTHENTICATED");

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
export default InputArea;
