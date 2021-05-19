import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Post = (props) => {
  const { authorized } = props;
  const [post, setPost] = useState("");
  let history = useHistory();
  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch("https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorized}`,
      },
      body: JSON.stringify({ post }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert('Post added successfully')

        history.push("/YourPosts");
      })
      .catch(console.error);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1> Create New Post:</h1>
      <h3>Title:</h3>
      <input
        type="text"
        required
        placeholder="text"
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <h3>Description:</h3>
      <input
        type="text"
        required
        placeholder="text"
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
      <h3>Price:</h3>
      <input
        type="text"
        required
        placeholder="text"
        onChange={(e) => setPost({ ...post, price: e.target.value })}
      />
      <h3>Delivery:</h3>

      <input
        type="radio"
        required
        id="willDeliveryes"
        name="willDeliver"
        value="true"
        onChange={(e) => setPost({ ...post, willDeliver: e.target.value })}
      />
      <label htmlFor="willDeliveryes">Yes</label>
      <input
        type="radio"
        required
        id="willDeliverno"
        name="willDeliver"
        value="false"
        onChange={(e) => setPost({ ...post, willDeliver: e.target.value })}
      />
      <label htmlFor="willDeliverno">No</label>
      <p></p>
      <button type="button" className="btn btn-success" type="submit">submit</button>
    </form>
  );
};

export default Post;
