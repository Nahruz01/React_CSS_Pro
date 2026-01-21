// src/_pages/ChallengesPantunPen.jsx
import CustomLink from "../../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import "../../_styles/PantunPen.css";
import { useAuth } from "../../_context/AuthContext.jsx";

export default function ChallengesPantunPen({ editMode = false }) {
  const { user } = useAuth();
  const { postId } = useParams();

  // Pantun fields
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(["", "", "", ""]);
  const [tag, setTag] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [mode, setMode] = useState("structured");
  const [freeformText, setFreeformText] = useState("");
  const [caption, setCaption] = useState("");
  const [pantunRating, setPantunRating] = useState(null);
  const [rhymerInput, setRhymerInput] = useState("");

  // Challenge state
  const [challenges, setChallenges] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const timerRef = useRef(null);

  // ------------------- Pantun lines handlers -------------------
  function addLine() { setLines(prev => [...prev, ""]); }
  function removeLine() { setLines(prev => prev.length > 1 ? prev.slice(0, -1) : prev); }
  function updateLine(index, value) { setLines(prev => { const copy = [...prev]; copy[index] = value; return copy; }); }
  function updateTag(value) { setTag(value); }

  // ------------------- Fetch tags -------------------
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

  // ------------------- Fetch challenges -------------------
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("http://localhost:5000/challenges");
        const data = await res.json();
        setChallenges(data);
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
      }
    };
    fetchChallenges();
  }, []);

  // ------------------- Load stored challenge -------------------
  useEffect(() => {
    const stored = localStorage.getItem("challengeData");
    const startTime = localStorage.getItem("challengeStartTime");
    const duration = localStorage.getItem("challengeDuration");

    if (stored && startTime && duration) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = duration - elapsed;
      if (remaining > 0) {
        setActiveChallenge(JSON.parse(stored));
        setTimeLeft(remaining);
        setChallengeStarted(true);
      } else {
        clearChallenge();
      }
    }
  }, []);

  // ------------------- Timer -------------------
  useEffect(() => {
    if (!challengeStarted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [challengeStarted]);

  const clearChallenge = () => {
    localStorage.removeItem("challengeStartTime");
    localStorage.removeItem("challengeDuration");
    localStorage.removeItem("challengeData");
    setChallengeStarted(false);
    setTimeLeft(0);
    setActiveChallenge(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startChallenge = (challenge) => {
    const duration = challenge.time_limit;
    const startTime = Date.now();

    localStorage.setItem("challengeStartTime", startTime);
    localStorage.setItem("challengeDuration", duration);
    localStorage.setItem("challengeData", JSON.stringify(challenge));

    setActiveChallenge(challenge);
    setChallengeStarted(true);
    setTimeLeft(duration);
  };

  const startRandomChallenge = () => {
    if (challenges.length === 0) return;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    startChallenge(challenges[randomIndex]);
  };

  // ------------------- Fetch post if editMode -------------------
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




const printActiveChallenge = () => {
  console.log("Active Challenge:", activeChallenge);
  alert(activeChallenge ? `Challenge: ${activeChallenge.title}` : "No active challenge");
};






  // ------------------- Submit Pantun -------------------
  const handlePantunSubmit = async () => {
    if (!user) return alert("Please log in");


      // Stop the timer if a challenge is active
    if (challengeStarted && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setChallengeStarted(false);
    }

    let finalLines = [];
    if (mode === "structured") {
      finalLines = lines.map(l => l.trim()).filter(l => l !== "");
      if (finalLines.length === 0) return alert("Pantun must contain at least 1 line.");
    } else {
      finalLines = freeformText.split("\n").map(l => l.trim()).filter(l => l !== "");
      if (finalLines.length === 0) return alert("Pantun must contain at least 1 line.");
    }

    const elapsedSeconds = activeChallenge ? activeChallenge.time_limit - timeLeft : null;

    const pantunData = {
      title,
      tag_ids: tag ? [tag] : [],
      lines: finalLines,
      caption,
      user_id: user.user_id,
      ...(activeChallenge && {
        challenge_id: activeChallenge.challenge_id,
        duration_seconds: elapsedSeconds
      })
    };

    console.log("OUTGOING DATA:", pantunData);

    try {
      const isChallengeMode = Boolean(activeChallenge);

      const url = editMode
        ? `http://127.0.0.1:5000/posts/${postId}`
        : isChallengeMode
          ? "http://127.0.0.1:5000/challenge/submit"
          : "http://127.0.0.1:5000/add_pantun";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pantunData),
      });

      const result = await response.json();
      if (!response.ok) return alert("Error: " + (result.error || "Unknown error"));

      const pantunId = result.pantun_id;
      if (!pantunId) return alert("Pantun submitted, but rating could not be fetched.");

      const ratingResponse = await fetch(`http://127.0.0.1:5000/pantun/${pantunId}/rating`);
      const ratingData = await ratingResponse.json();
      setPantunRating(ratingData);

      alert("Pantun Challenge submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Pantun Challenge submission failed");
    }
  };

  // ------------------- Render -------------------
  return (
    <div className="PantunPen_Frame">
      <div className="PantunPen_Main">
        <h1>Pantun Pen</h1>

        <div className="PantunPen_ModeSwitch">
          <label>
            <input type="radio" name="pantunMode" value="structured"
              checked={mode === "structured"} onChange={() => setMode("structured")} /> Pantun Structure
          </label>
          <label>
            <input type="radio" name="pantunMode" value="freeform"
              checked={mode === "freeform"} onChange={() => setMode("freeform")} /> Freeform
          </label>
        </div>

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <select value={tag} onChange={(e) => updateTag(e.target.value)}>
          <option value="">Select Tag</option>
          {tagOptions.map(t => <option key={t.tag_id} value={t.tag_id}>{t.tag_name}</option>)}
        </select>

        {mode === "structured" && lines.map((line, i) =>
          <input key={i} type="text" placeholder={`Line ${i + 1}`} value={line} onChange={(e) => updateLine(i, e.target.value)} />
        )}
        {mode === "structured" && (
          <>
            <button type="button" onClick={removeLine}>-</button>
            <button type="button" onClick={addLine}>+</button>
          </>
        )}

        {mode === "freeform" && (
          <textarea placeholder="Write your pantun freely here..." value={freeformText}
            onChange={(e) => setFreeformText(e.target.value)} rows={8} />
        )}

        <textarea placeholder="Write a caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />

        <button type="button" onClick={handlePantunSubmit} disabled={!activeChallenge}>
          Submit Challenge Entry
        </button>
        <button type="button" onClick={printActiveChallenge} disabled={!activeChallenge}>
          Print activeChallenge
        </button>


      </div>

      <div className="PantunPen_SideNav">
        <nav>
          <ul className="pantun-nav">
            <CustomLink to="Challenge_Info">Challenge</CustomLink>
            <CustomLink to="Rater">Rater</CustomLink>
            <CustomLink to="Rhymer">Rhymer</CustomLink>
            <CustomLink to="Class">Guidelines</CustomLink>
          </ul>
        </nav>

        <Outlet context={{
          title, lines, rhymerInput, setRhymerInput, mode,
          activeChallenge, startChallenge, startRandomChallenge,
          timeLeft, challengeStarted, challenges, setChallengeStarted, clearChallenge
        }} />
      </div>
    </div>
  );
}
