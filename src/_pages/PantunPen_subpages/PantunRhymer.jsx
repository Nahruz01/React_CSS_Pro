// src/_pages/PantunRhymer.jsx

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import "../../_styles/PantunRhymer.css";

export default function PantunRhymer() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(`http://127.0.0.1:5000/rhyme/${word}`);
    const data = await res.json();
    setResults(data.matches);
  };

  return (
    <div className="PantunRhymer_Frame">
      <div className="RhymeSearchBar">
        <input
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Search rhyme..."
        />
        <button onClick={search}>Find</button>
      </div>


      <div className="RhymeResults ">
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}