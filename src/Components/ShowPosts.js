import React from "react";

import Messages from "./Messages";

const ShowPosts = (props) => {
  const { allPosts, setAllPosts, authorized, searchValue, currentUser } = props;

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
    fetchPosts();
  };
  function fetchPosts() {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data.data.posts);
      })
      .catch(console.error);
  }

  if (allPosts) {
    return allPosts.map(
      ({
        active,
        _id,
        title,
        description,
        location,
        author,
        price,
        createdAt,
        updatedAt,
        willDeliver,
      }) => active === true && (
        <div className="postBox" key={_id}>
          <span className="postTitle">
            Title: {title}, Price: {price}
          </span>
          <span className="postDescription"></span>
          <h4>Description: {description}</h4>
          <span className="postLocation">Location: {location} </span>
          <span className="postLocation">
            Delivery: {willDeliver ? "Yes" : "No"}{" "}
          </span>
          <span className="postAuthor">Created By: {author.username}</span>
          <span className="postCreatedUpdated">
            {createdAt}, {updatedAt}
          </span>
          <hr></hr>
          <hr></hr>
          {!authorized ? (
            "You are currently not logged in so you cannot send messages or create posts."
          ) : currentUser === author.username ? (
            <button
              type="button"
              className="postDelete"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          ) : (
            <Messages _id={_id} authorized={authorized} />
          )}
        </div>
      )
    );
  } else {
    fetchPosts();
  }

  return <></>;
};

export default ShowPosts;
