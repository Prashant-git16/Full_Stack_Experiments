import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/postsSlice";

function CreatePost() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const handleSubmit = () => {
    if (!title || !content) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        platform,
      })
    );

    setTitle("");
    setContent("");
    setPlatform("Instagram");
  };

  return (
    <div>
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {platforms.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleSubmit}>
        Add Post
      </button>
    </div>
  );
}

export default CreatePost;