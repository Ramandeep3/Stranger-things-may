import React, { useState } from "react";
import Popup from "reactjs-popup";

const Messages = (props) => {
  const { _id, authorized } = props;
  const [message, setMessage] = useState("");

  const SendMessage = async (_id, message) => {
    
    fetch(
      `https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts/${_id}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorized}`,
        },
        body: JSON.stringify({ message: message }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        alert('Message Send Successfully')
      })
      .catch(console.error);
  };

  return (
    <Popup
      trigger={<button className="postEdit"> Message </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Send Message </div>
          <div className="content">
            {" "}
            <label>Message:</label>
            <input
              name="Username"
              required
              onChange={(e) =>
                setMessage({ ...message, content: e.target.value })
              }
            />
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                SendMessage(_id, message);
                close();
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};



export default Messages;
