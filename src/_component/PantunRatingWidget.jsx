export default function PantunRatingWidget({
  pantunRating,
  lines,
  detectRhyme,
  countSyllables,
  StanzaDetectLines,
  t
}) {
  return (
    <div className="sidebar-card">
      <h3>{t("pantun_rules")}</h3>
      <p>Stanza: {pantunRating?.all_lines_filled ? "✅ 4 lines" : `${StanzaDetectLines}/4`}</p>
      <p>Rhyme: {detectRhyme(lines)}</p>
      <p>Moral: {pantunRating?.moral_detected ? "✅ Yes" : "❌ No"}</p>

      <hr />

      <p>Syllables:</p>
      {lines.map((line, i) => (
        <p key={i}>Line {i + 1}: {countSyllables(line)}</p>
      ))}

      <h3>{t("Pantun Rating")}</h3>
      <p>
        {t("Rating")}:
        {[...Array(5)].map((_, i) => (
          <span key={i}>{pantunRating && pantunRating.rating > i ? "★" : "☆"}</span>
        ))}
      </p>

      <p>Score: {pantunRating ? pantunRating.auto_score : 0}</p>
    </div>
  );
}
