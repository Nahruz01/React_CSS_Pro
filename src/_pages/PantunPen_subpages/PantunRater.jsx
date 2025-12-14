import { useOutletContext } from "react-router-dom";
import "../../_styles/PantunRater.css";

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

  const detectMoral = () => {
    const keywords = ["nasihat", "baik", "jangan", "hormat", "bijak"];
    const text = lines.join(" ").toLowerCase();
    return keywords.some(k => text.includes(k));
  };

  const isEmptyPantun = lines.every(l => l.trim() === "");

  const frontendCalculateRating = (syllables, rhyme, moral) => {
    if (lines.every(l => l.trim() === "")) {
      return { star: 0, autoScore: 0 };
    }

    const syllableScore = syllables.filter(s => s >= 8 && s <= 12).length;

    const rhymeMap = {
      "ABAB": 5,
      "AAAA": 4,
      "Partial": 2,
      "No Rhyme": 0,
      "Incomplete": 0
    };

    const rhymeScore = rhymeMap[rhyme] || 0;
    const moralScore = moral ? 2 : 0;

    const autoScore = syllableScore + rhymeScore + moralScore;

    let star = 1;
    if (autoScore >= 9) star = 5;
    else if (autoScore >= 7) star = 4;
    else if (autoScore >= 5) star = 3;
    else if (autoScore >= 3) star = 2;

    return { star, autoScore };
  };


  const syllables = lines.map(countSyllables);
  const rhyme = detectRhyme();
  const moral = detectMoral();
  const { star, autoScore } = frontendCalculateRating(syllables, rhyme, moral);

  return (
    <div className="PantunRater_Frame">
      <h2>Pantun Evaluator</h2>

      <h3>Title</h3>
      <p>{title || "No Title Yet"}</p>

      <h3>Pantun Rules</h3>
      <p>Stanza Filled: {lines.filter((l) => l.trim() !== "").length}/4</p>
      <p>Rhyme Scheme: {rhyme}</p>

      <h3>Syllable Count</h3>
      {lines.map((line, i) => (
        <p key={i}>
          Line {i + 1}: {countSyllables(line)}
        </p>
      ))}

      <p>Evaluation Review: {"★".repeat(star) + "✰".repeat(5 - star)}</p>
      <p>Score: {autoScore}</p>
    </div>
  );
}
