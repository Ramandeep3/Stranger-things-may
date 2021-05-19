import React, { useState } from "react";
import Messages from "./Messages";

const Profile = (props) => {
  const { authorized } = props;
  const [allMessages, setAllMessages] = useState(false);

  function fetchMessages() {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorized}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setAllMessages(result.data.messages);
      })
      .catch(console.error);
  }

  if (authorized && allMessages) {
    return allMessages.map(({ _id, post, fromUser, content }, index) => (
        <div key={_id} className="mainContainer">
        { index === 0 &&
          <h1>List Of recieved Messages</h1>
        }
        <div className="postBox">
          <span className="postTitle">Post Name: {post.title}</span>
          <span className="postAuthor">Send By: {fromUser.username}</span>
          <span className="postDescription">Message: {content}</span>
        </div>
      </div>
    ));
  } else {
    fetchMessages();
  }

  return <></>;
};

export default Profile;
