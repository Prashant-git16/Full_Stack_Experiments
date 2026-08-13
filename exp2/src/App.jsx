import "./App.css";
import CreatePost from "./components/CreatePost";
import PostsList from "./components/PostsList";

function App() {
  return (
    <div className="container">
      <h1>Social Media Post Manager</h1>

      <CreatePost />

      <hr />

      <PostsList />
    </div>
  );
}

export default App;