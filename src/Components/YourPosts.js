import React, { useState } from "react";
import Messages from "./Messages";

const YourPosts = (props) => {
  const { authorized, currentUser } = props;
  const [allPosts, setAllPosts] = useState(false);
  const [messagePost, setMessagePost] = useState(false);

  const handleDelete = async (deletePost) => {

    const res = await fetch(
      `https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts/${deletePost}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorized}`,
        },
      }
    );
    const data = await res.json();
    alert('Deleted post successfully')
    fetchMessages();
  };

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
        setAllPosts(result.data.posts);

      })
      .catch(console.error);
  }

  if (authorized && allPosts.length > 0) {
    return allPosts.map(
      ({
        _id,
        title,
        description,
        location,
        author,
        price,
        createdAt,
        updatedAt,
        willDeliver,
        messages,
        active
      }, index) => active === true && (
        <div className="mainContainer" key={_id}>
          <div className="postBox">
            <span className="postTitle">
              Title: {title} Price: {price}
            </span>
            <span className="postDescription"></span>
            <h4>Description: {description}</h4>
            <span className="postLocation">Location: {location} </span>
            <span className="postLocation">
              Delivery: {willDeliver ? "Yes" : "No"}{" "}
            </span>
            <span className="postAuthor">Created By: {currentUser}</span>
            <span className="postCreatedUpdated">
              {createdAt}, {updatedAt}
            </span>
            <hr></hr>
            <hr></hr>
            {!authorized ? (
              "You are currently not logged in and cannot send messages or create posts."
            ) :
            <>
            <div className="yourpost-btn">
              <button
                type="button"
                className="postDelete"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setMessagePost(_id)}
              >
                See Messages
              </button>
            </div>
            <div className="list-msg">
            {
              messagePost  === _id &&
              <h2>List of messages for this post</h2>
            }

            { messagePost  === _id && messages.length>0 && messages.map(({ _id, post, fromUser, content }, index) => (
                  <div key={_id} className="mainContainer">
                  { index === 0 &&
                    <h1>List Of recieved Messages</h1>
                  }
                  <div className="postBox" key={_id}>
                    <span className="postAuthor">Send By: {fromUser.username}</span>
                    <span className="postDescription">Message: {content}</span>
                  </div>
                </div>
              ))
            }
            { messagePost  === _id && messages.length === 0 &&
              <h4>No messages found for this post</h4>
            }
            </div>
            </>
            }
          </div>
        </div>
      )

    );
  } else {
    fetchMessages();
  }

  return <></>;
};

export default YourPosts;
