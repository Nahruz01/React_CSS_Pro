// src/_pages/PantunRhymer.jsx

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function PantunRhymer() {
  const { rhymerInput, setRhymerInput } = useOutletContext();

  return (
    <div>
      <h2>Pantun Rhymer</h2>
      <p>This is a placeholder for now.</p>
      <input type="text" placeholder="Title" value={rhymerInput} onChange={(e) => setRhymerInput(e.target.value)}/><br></br>
      <input type="text" placeholder="Enter a word to find rhymes" />

    </div>
  );
}