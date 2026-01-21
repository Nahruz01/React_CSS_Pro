// src/_pages/PantunPen.jsx
import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../_styles/PantunPen.css";
import { useAuth } from "../_context/AuthContext.jsx";

import { useTranslation } from "react-i18next";


export default function PantunPen({ editMode = false }) {
  const { user } = useAuth();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(["", "", "", ""]);
  const [tag, setTag] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
 
  const [mode, setMode] = useState("structured");
  const [freeformText, setFreeformText] = useState("");

  const [caption, setCaption] = useState("");


  const [pantunRating, setPantunRating] = useState(null);
  const [rhymerInput, setRhymerInput] = useState("");


  function addLine() {
    setLines(prev => [...prev, ""]);
  }

  function removeLine(index) {
    setLines(prev => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }
 
  function updateLine(index, value) {
    setLines(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  // fetch post for editing
  useEffect(() => {
    if (editMode && postId) {
      fetch(`http://127.0.0.1:5000/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title || "");
          setCaption(data.caption || "");
          setLines(data.lines || ["", "", "", ""]);

          setTag(data.tags && data.tags.length > 0 ? String(data.tags[0]) : "");
        })
        .catch(err => console.error("Fetch error:", err));
    }
  }, [editMode, postId]);


  // Get Tags for Dropdown
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/tags");
        const data = await res.json();
        setTagOptions(data);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };
    fetchTags();
  }, []);


  function updateTag(value) {
    setTag(value);
  }

  const handlePantunSubmit = async () => {
    if (!user) return alert("Please log in");

    // Prepare lines based on mode
    let finalLines = [];
    if (mode === "structured") {
      finalLines = lines.map(l => l.trim()).filter(l => l !== "");
      if (finalLines.length === 0) return alert("Pantun must contain at least 1 line.");
    } else {
      finalLines = freeformText.split("\n").map(l => l.trim()).filter(l => l !== "");
      if (finalLines.length === 0) return alert("Pantun must contain at least 1 line.");
    }

    const pantunData = {
      title,
      tag_ids: tag ? [tag] : [],
      lines: finalLines,
      caption,
      user_id: user.user_id
    };

    console.log("OUTGOING DATA:", pantunData);

    try {
      const url = editMode 
        ? `http://127.0.0.1:5000/posts/${postId}`
        : "http://127.0.0.1:5000/add_pantun";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pantunData),
      });

      const result = await response.json();

      if (!response.ok) return alert("Error: " + (result.error || "Unknown error"));

      // Use returned pantun_id from backend
      const pantunId = result.pantun_id;
      if (!pantunId) {
        console.warn("No pantun_id returned from backend; cannot fetch rating.");
        return alert("Pantun submitted, but rating could not be fetched.");
      }

      // Fetch pantun rating
      const ratingResponse = await fetch(`http://127.0.0.1:5000/pantun/${pantunId}/rating`);
      const ratingData = await ratingResponse.json();
      setPantunRating(ratingData);

      alert("Pantun submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Pantun submission failed");
    }
  };

  const effectiveLines =
  mode === "structured"
    ? lines.filter(l => l.trim() !== "")
    : freeformText
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");


  return (
    <>
      <div className="PantunPen_Frame"> 
        
        {/* // For future reference use mapping for dynamic input fields for pantun lines */}
        <div className="PantunPen_Main">
          <h1>Pantun Pen</h1>

          <div className="PantunPen_ModeSwitch">
            <label>
              <input
                type="radio"
                name="pantunMode"
                value="structured"
                checked={mode === "structured"}
                onChange={() => setMode("structured")}
              />
              Pantun Structure
            </label>

            <label> 
              <input
                type="radio"
                name="pantunMode"
                value="freeform"
                checked={mode === "freeform"}
                onChange={() => setMode("freeform")}
              />
              Freeform
            </label>
          </div>

          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/><br></br>
          <select value={tag} onChange={(e) => updateTag(e.target.value)}>
            <option value="">Select Tag</option>
            {tagOptions.map(t => (
              <option key={t.tag_id} value={t.tag_id}>{t.tag_name}</option>
            ))}
          </select>
          
          {mode === "structured" && (
            <>
              {lines.map((line, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Line ${index + 1}`}
                  value={line}
                  onChange={(e) => updateLine(index, e.target.value)}
                />
              ))}

              <button type="button" className="add-line-btn" onClick={removeLine}>
                -
              </button>
              <button type="button" className="add-line-btn" onClick={addLine}>
                +
              </button>
            </>
          )}

          {mode === "freeform" && (
            <textarea
              className="PantunPen_Freeform"
              placeholder="Write your pantun freely here..."
              value={freeformText}
              onChange={(e) => setFreeformText(e.target.value)}
              rows={8}
            />
          )}

          <textarea
            placeholder="Write a caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

    
          <button type="button" onClick={handlePantunSubmit}>
            {editMode ? "Edit Pantun" : "Submit Pantun"}
          </button>


        </div>


        <div className="PantunPen_SideNav">
        <nav className="pantun-nav">
          <ul>
          <CustomLink to="Rater">Rater</CustomLink>
          <CustomLink to="Rhymer">Rhymer</CustomLink>
          <CustomLink to="Class">Guidelines</CustomLink>
          </ul>
        </nav>

        <Outlet context={{ title, lines, rhymerInput, setRhymerInput, mode }} />
        </div>
      </div>
    </>


  );
}
