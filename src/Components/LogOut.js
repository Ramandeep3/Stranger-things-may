import React from "react";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login";

const LogOut = (props) => {
  const { setAuthorized, setCurrentUser, authorized } = props;

  function handleLogout(e) {
    e.preventDefault();
    setAuthorized(false);
    setCurrentUser("");
    localStorage.removeItem('authtoken');
    localStorage.removeItem('authcuser');
    <Route exact path="/LogOut">
      <Redirect to="/Login" component={Login} />
    </Route>;
  }

  return (
    <div>
      {authorized ? (
        <div className="mainContainer">
          <h1>Click the button below to log out</h1>
          <button type="button" className="postDelete" onClick={handleLogout}>Log out</button>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default LogOut;
