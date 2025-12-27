import { useEffect, useState } from "react";
import { useAuth } from "../../_context/AuthContext.jsx";
import CommentModal from "./Exp_Comment_Modal.jsx";

export default function Favourites() {
  const { user } = useAuth();
  const [pantuns, setPantuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showComment, setShowComment] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`http://127.0.0.1:5000/pantuns/favorites?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        setPantuns(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p>Loading favorites...</p>;

  const handleLike = (post_id) => {
    fetch(`http://127.0.0.1:5000/posts/${post_id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id })
    })
      .then(res => res.json())
      .then(data => {
        setPantuns(prev =>
          prev.map(item =>
            item.post_id === post_id
              ? { ...item, likes_count: data.likes_count }
              : item
          )
        );
      });
  };

  const toggleFavourite = async (pantun_id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/posts/${pantun_id}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle favorite");

      // If unfavorited, remove from state
      if (data.action === "removed") {
        setPantuns(prev => prev.filter(item => item.pantun_id !== pantun_id));
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };

  return (
    <div>
      {pantuns.length === 0 && <p>No favorites found.</p>}

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

          <div className="Post_Buttons">
            <button onClick={() => handleLike(p.post_id)}>
              <span className="value">{p.likes_count}</span>
              <span className="icon">👍</span>
              Like
            </button>

            <button onClick={() => {
              setActivePostId(p.post_id);
              setShowComment(true);
            }}>
              <span className="value">{p.comments_count}</span>
              <span className="icon">💬</span>
              Comment
            </button>

            <button
              className="Small_Button"
              onClick={() => toggleFavourite(p.pantun_id)}
            >
              ❤️
            </button>
          </div>
        </div>
      ))}

      {showComment && (
        <CommentModal
          postId={activePostId}
          onClose={() => {
            setShowComment(false);
            setActivePostId(null);
          }}
        />
      )}
    </div>
  );
}
