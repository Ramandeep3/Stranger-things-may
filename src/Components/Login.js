import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState("");
  const { setAuthorized, setCurrentUser, currentUser } = props;

  let history = useHistory();

  function helperHandleSubmit(e) {
    setUser({ ...user, password: e.target.value });
    setCurrentUser(user.username);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/users/login",
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
          alert("Logged in.");
          setAuthorized(result.data.token);
          localStorage.setItem('authtoken', result.data.token)
          localStorage.setItem('authcuser', currentUser)
          history.push("/YourPosts");
        } else {
          alert("Failed to login.");

        }
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="login"> Login:</h1>
      <label className="username">Username:</label>
      <input
        name="Username"
        required
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label className="password">Password:</label>
      <input type="password" required onChange={(e) => helperHandleSubmit(e)} />
      <button className="submit">submit</button>
    </form>
  );
};

export default Login;
