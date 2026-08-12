import { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          ✈️
        </div>

        <h1>Airport Management</h1>

        <p className="login-subtitle">
          Login to access the management system
        </p>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}