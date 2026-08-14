import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function PostForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newPost = {
      id: Date.now(),
      title: title,
    };
    dispatch(addPost(newPost));
    setTitle("");
  };
  return (
  <div className="card">
    <h2>Create New Post</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What's on your mind?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        Add Post
      </button>
    </form>
  </div>
);
}
export default PostForm;