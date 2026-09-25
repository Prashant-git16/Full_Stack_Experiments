import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("viewer");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      username,
      role
    });

    navigate("/home");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;