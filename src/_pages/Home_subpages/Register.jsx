// src/_pages/Home_subpages/Register.jsx
import { useState } from "react";
import "../../_styles/RegisterModal.css";

export default function RegisterModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message || data.error);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Register Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={register}>Register</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}
