import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/postsSlice";

function PostsList() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

return (
  <div>
    <h2>Posts</h2>

    {posts.length === 0 ? (
      <p style={{ color: "#94a3b8" }}>No posts available.</p>
    ) : (
      posts.map((post) => (
        <div className="post-card" key={post.id}>
          <h3>{post.title}</h3>

          <p>{post.content}</p>

          <span>{post.platform}</span>

          <br />

          <button
            style={{ marginTop: "15px" }}
            onClick={() => dispatch(deletePost(post.id))}
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
);}
export default PostsList;