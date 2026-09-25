import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Link to="/home">Home</Link>

      {" | "}

      <Link to="/dashboard">Dashboard</Link>

      {" | "}

      {user.role === "admin" && (
        <Link to="/admin">Admin</Link>
      )}

      {" | "}

      <button onClick={handleLogout}>
        Logout
      </button>

      <p>
        Logged in as {user.username} ({user.role})
      </p>

      <hr />
    </div>
  );
}

export default Navbar;