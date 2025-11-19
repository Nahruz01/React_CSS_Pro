// src/_pages/PantunPen.jsx
import { useState } from "react";
import "../_styles/PantunPen.css";

export default function PantunPen() {
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(["", "", "", ""]);

  return (
    <div>
      <h2>Pantun Pen</h2>

      <input
        type="text"
        placeholder="Pantun Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {lines.map((line, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Line ${i + 1}`}
          value={line}
          onChange={(e) => {
            const updated = [...lines];
            updated[i] = e.target.value;
            setLines(updated);
          }}
        />
      ))}

      <button className="submit-button">Rate</button>

      <div className="preview-card">
        <h3>Pantun Preview</h3>
        <p>{title}</p>
        {lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>
    </div>
  );
}
