import { useEffect, useState } from "react";

export default function ExploreFeed() {
  const [pantuns, setPantuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/pantuns")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data); // DEBUG
        setPantuns(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pantun...</p>;

  return (
    <div>
      {pantuns.length === 0 && <p>No pantun found.</p>}

      {/* Only Backend Reading/No Writing and No Feedback just yet */}
      {pantuns.map(p => (
        <div key={p.pantun_id} className="Post_Card">
        <div className="Post_Header">
          <h3>{p.title}</h3>
          <span className="Post_Username">{p.username || "Anonymous"}</span>
        </div>
          <p><strong>{p.tags}</strong></p>
          <div className="Post_Content">
          <p>{p.line1}</p>
          <p>{p.line2}</p>
          <p>{p.line3}</p>
          <p>{p.line4}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
