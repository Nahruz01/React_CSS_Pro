import { useEffect, useState } from "react";

import { useAuth } from "../../_context/AuthContext.jsx";

import CommentModal from "../../_pages/Explore_subpages/Exp_Comment_Modal.jsx";
import PostDetailsModal from "../../_pages/Explore_subpages/Exp_Details_Modal.jsx";

export default function ExploreFeed() {
  const { user } = useAuth();
  
  const [pantuns, setPantuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFav, setIsFav] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [activeDetailsPost, setActiveDetailsPost] = useState(null);


  const toggleFavourite = async (pantun_id, isFav) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/posts/${pantun_id}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.user_id })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle favorite");

      // Update frontend state
      setPantuns(prev =>
        prev.map(item =>
          item.pantun_id === pantun_id
            ? { ...item, isFav: data.action === "added" } // set isFav based on backend response
            : item
        )
      );
    } catch (err) {
      console.error("Favorite toggle error:", err);
    }
  };


  useEffect(() => {
    if (!user) return;

    fetch(`http://127.0.0.1:5000/pantuns/public?user_id=${user.user_id}`)
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


  if (loading) return <p>Loading pantun...</p>;

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
          {p.caption && (
            <p className="post-caption">{p.caption}</p>
          )}

          <div className="Post_Content">
            {Array.isArray(p.lines) && p.lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>


          <div className="Post_Buttons">
            {/* View Details Button */}
            <button key={p.post_id} onClick={() => handleLike(p.post_id)}>
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
              onClick={() => {
                setActiveDetailsPost(p);
                setShowDetails(true);
              }}
            >
              <span className="icon">📓</span>
              Details
            </button>


            <button
              className="Small_Button"
              onClick={() => toggleFavourite(p.pantun_id, p.isFav)}
            >
              {p.isFav ? "❤️" : "🤍"}
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

      {showDetails && activeDetailsPost && (
        <PostDetailsModal
          post={activeDetailsPost}
          onClose={() => {
            setShowDetails(false);
            setActiveDetailsPost(null);
          }}
        />
      )}

    </div>
  );
}
