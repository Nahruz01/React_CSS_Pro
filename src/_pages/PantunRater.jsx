// src/_pages/PantunRater.jsx
import { useOutletContext } from "react-router-dom";
import "../_styles/PantunRater.css";

export default function PantunRater() {
  
  const { title, lines } = useOutletContext();

  const getLastWord = (line) =>
    line.trim().split(/\s+/).pop()?.replace(/[^\w]/g, "").toLowerCase() || "";

  const getLastSyllable = (word) => {
    const match = word.match(/[^aeiou]*[aeiou]+(?:ng|[bcdfghjklmnpqrstvwxyz]*)?/gi);
    return match?.[match.length - 1]?.toLowerCase() || word.toLowerCase();
  };

  const detectRhyme = () => {
    if (!lines || lines.length < 4) return "Incomplete";

    const lastSyllables = lines.map((line) =>
      getLastSyllable(getLastWord(line))
    );

    const [a1, b1, a2, b2] = lastSyllables;

    if (a1 === a2 && b1 === b2 && a1 !== b1) return "ABAB";
    if (a1 === a2 && a2 === b1 && b1 === b2) return "AAAA";
    if (a1 === a2 || b1 === b2) return "Partial";
    return "No Rhyme";
  };

  const countSyllables = (line) =>
    (line.match(/[aeiou]/gi) || []).length;

  return (
    <div className="PantunRater_Frame">
      <h2>Pantun Evaluator</h2>

      <h3>Title</h3>
      <p>{title || "No Title Yet"}</p>

      <h3>Pantun Rules</h3>
      <p>Stanza Filled: {lines.filter((l) => l.trim() !== "").length}/4</p>
      <p>Rhyme Scheme: {detectRhyme()}</p>

      <h3>Syllable Count</h3>
      {lines.map((line, i) => (
        <p key={i}>
          Line {i + 1}: {countSyllables(line)}
        </p>
      ))}

      <h3>Pantun Rating</h3>
      <p>Rating (Frontend Demo): ★★✰✰✰</p>
      <p>Score: (coming from backend later)</p>
    </div>
  );
}
