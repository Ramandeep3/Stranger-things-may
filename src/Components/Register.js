
import React, { useState } from "react";

const Register = (props) => {
  const [user, setUser] = useState("");

  const { setAuthorized } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    )
      .then((response) => response.json())
      .then((result) => {

        if (result.success) {
          alert("Registered.");
          setAuthorized(result.data.token);
        } else {
          alert("Username Already exists");
        }
      })
      .catch(console.error);
  };

  return (

    <form onSubmit={handleSubmit}>

      <h1 className="register"> Registration:</h1>
      <label className="username">Username:</label>
      <input
        name="Username"
        required
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label className="password">Password:</label>
      <input
        type="password"
        required
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="submit">submit</button>
      <h2 className="account">Don't Have Account?Register Here.</h2>
    </form>
  );
};

export default Register;
