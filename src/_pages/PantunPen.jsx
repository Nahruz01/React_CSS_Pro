// src/_pages/PantunPen.jsx
import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import "../_styles/PantunPen.css";

import { useTranslation } from "react-i18next";
export default function PantunPen() {

  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(["", "", "", ""]);
  const [tag, setTag] = useState("");
  const [pantunRating, setPantunRating] = useState(null);

  const [rhymerInput, setRhymerInput] = useState("");

  function updateLine(index, value) {
    setLines(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  const tagOptions = ["love", "wisdom", "humor", "spiritual"];
  function updateTag(value) {
    setTag(value);
  }

const handlePantunSubmit = async () => {
  const pantunData = {
    title: title,
    tags: tag,          // ✔ MATCHES BACKEND tags follow backend dont change that
    lines: lines,      // ✔ BACKEND EXPECTS AN ARRAY
    user_id: 0,
  };

  console.log("OUTGOING DATA:", pantunData);

  try {
    const response = await fetch("http://127.0.0.1:5000/add_pantun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pantunData),
    });

    const result = await response.json();
    console.log("BACKEND RESPONSE:", result);

    if (!response.ok) {
      alert("Error: " + result.error);
      return;
    }

    // Now fetch rating (safe)
    const ratingResponse = await fetch(
      `http://127.0.0.1:5000/pantun/${result.pantun_id}/rating`
    );
    const ratingData = await ratingResponse.json();
    setPantunRating(ratingData);

    alert("Pantun submitted!");
  } catch (err) {
    console.error(err);
    alert("Pantun failed");
  }
};

  return (
    <>
      <div className="PantunPen_Frame"> 
        
        {/* // For future reference use mapping for dynamic input fields for pantun lines */}
        <div className="PantunPen_Main">
          <h1>Pantun Pen</h1>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/><br></br>
          <select value={tag} onChange={(e) => updateTag(e.target.value)}>
            <option value="">Select Tag</option>
            {tagOptions.map(key => <option key={key} value={key}>{key}</option>)}
          </select><br></br>
          <input type="text" placeholder="Line 1" value={lines[0]} onChange={(e) => updateLine(0, e.target.value)}/><br></br>
          <input type="text" placeholder="Line 2" value={lines[1]} onChange={(e) => updateLine(1, e.target.value)}/><br></br>
          <input type="text" placeholder="Line 3" value={lines[2]} onChange={(e) => updateLine(2, e.target.value)}/><br></br>
          <input type="text" placeholder="Line 4" value={lines[3]} onChange={(e) => updateLine(3, e.target.value)}/><br></br>
          <button onClick={() => {handlePantunSubmit();}}>
            Submit Pantun
          </button>
        </div>


        <div className="PantunPen_SideNav">
        <>Navigation Test</>
        <nav>
          <ul>
          <CustomLink to="Rater">Rater</CustomLink>
          <CustomLink to="Rhymer">Rhymer</CustomLink>
          <CustomLink to="Class">Class</CustomLink>
          </ul>
        </nav>

        <Outlet context={{ title, lines, rhymerInput, setRhymerInput }} />
        </div>
      </div>
    </>


  );
}
