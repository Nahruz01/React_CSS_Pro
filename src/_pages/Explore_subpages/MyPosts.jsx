import { useEffect, useState } from "react";
import { useAuth } from "../../_context/AuthContext.jsx";

import ConfirmModal from "../../_component/ConfirmModal.jsx";

import { useNavigate } from "react-router-dom";



//import "../../_styles/Explore_MyPosts.css";

export default function MyPosts() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pantuns, setPantuns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);


  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`http://127.0.0.1:5000/pantuns/mine?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("MyPosts response:", data);
        setPantuns(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setPantuns([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.user_id]);


  


  if (!user) return <p>Please log in to see your posts.</p>;
  if (loading) return <p>Loading your pantun...</p>;

  const confirmDeletePost = () => {
  if (!postToDelete) return;

  fetch(`http://127.0.0.1:5000/posts/${postToDelete.post_id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete post");

      // Remove from UI
      setPantuns(prev =>
        prev.filter(item => item.post_id !== postToDelete.post_id)
      );
    })
    .catch(() => {
      alert("Failed to delete post");
    })
    .finally(() => {
      setShowConfirm(false);
      setPostToDelete(null);
    });
};

  
  return (
    <div>
      <h2>My Posts</h2>
      {pantuns.length === 0 && <p>You haven’t posted any pantun yet.</p>}

      {pantuns.map(p => (
        <div key={p.pantun_id} className="Post_Card">
          <div className="Post_Header">
            <h3>{p.title}</h3>
            
  
            {/* Toggle Visibility */}
            <select
              value={p.visibility}
              onChange={e => {
                const newVisibility = e.target.value;

                // 1️⃣ Optimistic UI update
                setPantuns(prev =>
                  prev.map(item =>
                    item.post_id === p.post_id
                      ? { ...item, visibility: newVisibility }
                      : item
                  )
                );

                // 2️⃣ Backend sync
                fetch(`http://127.0.0.1:5000/posts/${p.post_id}/visibility`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ visibility: newVisibility })
                })
                .then(res => {
                  if (!res.ok) throw new Error("Failed to update visibility");
                })
                .catch(err => {
                  console.error(err);

                  // 3️⃣ Rollback on failure
                  setPantuns(prev =>
                    prev.map(item =>
                      item.post_id === p.post_id
                        ? { ...item, visibility: p.visibility }
                        : item
                    )
                  );

                  alert("Failed to update visibility. Please try again.");
                });
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

          </div>
          
          {/* <p><strong>{p.tags}</strong></p> */}
          {p.caption && (
            <p className="post-caption">{p.caption}</p>
          )}
          
          <div className="Post_Content">
            {Array.isArray(p.lines) &&
              p.lines.map((line, index) => (
                <p key={index}>
                  {typeof line === "string" ? line : line.line_text}
                </p>
              ))}

            {!p.lines && Array.isArray(p.pantun_lines) &&
              p.pantun_lines.map((line, index) => (
                <p key={index}>{line.line_text}</p>
              ))}
          </div>


          <div className="Post_Interactables_Info">
            <span className="metric">
              <strong>Likes</strong>
              <span className="value">{p.likes_count}</span>
            </span>

            <span className="metric">
              <strong>Comments</strong>
              <span className="value">{p.comments_count}</span>
            </span>

            <span className="metric">
              <strong>Rating</strong>
              <span className="value">{p.rating_avg?.toFixed(1) || "N/A"}</span>
            </span>

          </div>


          <div className="Post_Buttons">
            {/* Edit Button */}
            <button
              onClick={() => navigate(`/pantunpen/${p.post_id}/edit`)}
            >
              Edit Post
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                setPostToDelete(p);
                setShowConfirm(true);
              }}
            >
              Delete
            </button>



          </div>
        </div>
      ))}
      <ConfirmModal
        open={showConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDeletePost}
        onCancel={() => {
          setShowConfirm(false);
          setPostToDelete(null);
        }}
      />


    </div>
  );
}
