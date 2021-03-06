import React, { useState, useEffect } from "react";

import Messages from "./Messages";

const Search = (props) => {
  const { searchValue, authorized, setAllPosts, allPosts, currentUser } = props;
  const [filteredPosts, setFilteredPosts] = useState([]);

  function fetchPosts() {
    return fetch(
      "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredPosts(data.data.posts);
      })
      .catch(console.error);
  }

  const handleDelete = async (deletePost) => {
    alert("Post is deleted!");
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

    if (data) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
   }, [searchValue]);



  return filteredPosts
  .filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )
  .map(
    ({
      _id,
      title,
      description,
      location,
      author,
      price,
      createdAt,
      updatedAt,
    }) => (
      <div className="mainContainer" key={_id}>
        <div className="postBox">
          <span className="postTitle">
            Title: {title} Price: {price}
          </span>
          <span className="postDescription"></span>
          <h4>Description: {description}</h4>
          <span className="postLocation">Location: {location} </span>
          <span className="postAuthor">Created By: {author.username}</span>
          <span className="postCreatedUpdated">
            {createdAt}, {updatedAt}, [isAuthor]
          </span>
          {!authorized ? (
            "You are currently not logged in and cannot send messages or create posts."
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
      </div>
    )
  );
};

export default Search;
