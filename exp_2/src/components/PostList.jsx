import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postsSlice";

import { selectLongTitlePosts } from "../features/posts/postsSelectors";
function PostList() {
  const dispatch = useDispatch();

const posts = useSelector((state) => state.posts.items);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

return (
  <div className="card">
    <h2>Recent Posts</h2>

    {posts.length === 0 ? (
      <p>No Posts Available</p>
    ) : (
      posts.map((post) => (
        <div className="post-card" key={post.id}>
          <h3>{post.title}</h3>

          <button
            onClick={() => dispatch(deletePost(post.id))}
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
);
}

export default PostList;