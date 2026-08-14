import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <PostForm />
        <PostList />
      </div>
    </>
  );
}

export default App;