import Navbar from "../components/Navbar";

function Admin() {
  return (
    <div>
      <Navbar />

      <h1>Admin Panel</h1>

      <button>Create</button>

      <button>Edit</button>

      <button>Delete</button>
    </div>
  );
}

export default Admin;