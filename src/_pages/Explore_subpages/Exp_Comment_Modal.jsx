// src/_component/Exp_Comment_Modal.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../_context/AuthContext.jsx";
import "../../_styles/Explore_CommentModal.css";

import ConfirmModal from "../../_component/ConfirmModal.jsx";

export default function Exp_Comment_Modal({ postId, onClose }) {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hasCommented, setHasCommented] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);



  /* ---------------- Fetch all comments ---------------- */
  const fetchComments = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/posts/${postId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  /* ---------------- Check if user has commented ---------------- */
  const fetchHasCommented = () => {
    if (!user) return;
    fetch(`http://127.0.0.1:5000/posts/${postId}/comments/me?user_id=${user.user_id}`)
      .then(res => res.json())
      .then(data => setHasCommented(data.commented))
      .catch(() => setHasCommented(false));
  };

  /* ---------------- Initial load ---------------- */
  useEffect(() => {
    fetchComments();
    fetchHasCommented();
  }, [postId, user]);

  /* ---------------- Submit comment ---------------- */
  const handleSubmit = () => {
    if (!newComment.trim() || hasCommented) return;

    const tempComment = {
      username: user.username,
      content: newComment,
      created_at: new Date().toLocaleString()
    };

    // Optimistic UI update
    setComments(prev => [tempComment, ...prev]);
    setHasCommented(true);
    setNewComment("");

    fetch(`http://127.0.0.1:5000/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        content: tempComment.content
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to post comment");
      return fetch(`http://127.0.0.1:5000/posts/${postId}/comments`);
    })
    .then(res => res.json())
    .then(data => setComments(data))
    .catch(() => {
      // Revert optimistic update if POST fails
      setComments(prev => prev.filter(c => c !== tempComment));
      setHasCommented(false);
      alert("Failed to post comment");
    });
  };


  /* ---------------- Delete comment ---------------- */

const confirmDeleteComment = () => {
  fetch(
    `http://127.0.0.1:5000/posts/${postId}/comments/${commentToDelete}?user_id=${user.user_id}`,
    { method: "DELETE" }
  )
    .then(res => {
      if (!res.ok) throw new Error();
      setComments(prev => prev.filter(c => c.comment_id !== commentToDelete));
      setHasCommented(false);
    })
    .catch(() => alert("Failed to delete comment"))
    .finally(() => {
      setShowConfirm(false);
      setCommentToDelete(null);
    });
};



  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Comments</h2>

        {/* Comment List */}
        <div className="comments-list">
          {loading && <p>Loading comments...</p>}

          {!loading && comments.length === 0 && (
            <p className="empty-text">No comments yet.</p>
          )}

          {comments.map((c, i) => (
            <div
              key={c.comment_id || i}
              className={`comment-item ${c.username === user?.username ? "own-comment" : ""}`}
            >
              <div className="comment-header">
                <strong>{c.username}</strong>
                <span className="comment-time">{c.created_at}</span>
              </div>

              <p className="comment-content">{c.content}</p>

              {c.username === user?.username && (
              <button
                className="delete-comment-btn"
                onClick={() => {
                  setCommentToDelete(c.comment_id);
                  setShowConfirm(true);
                }}
              >
                Delete
              </button>

              )}
            </div>
          ))}

        </div>

        {/* Comment Input */}
        {!hasCommented ? (
          <div className="comment-input">
            <input
              type="text"
              placeholder="Leave a short comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <div className="Post_Buttons">
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim() || hasCommented}
              >
                Post
              </button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        ) : (
          <div className="comment-input">
            <p className="comment-locked">
              You have already commented on this post.
            </p>
            <div className="Post_Buttons">
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>


      <ConfirmModal
      open={showConfirm}
      title="Delete Comment"
      message="Are you sure you want to delete your comment? This action cannot be undone."
      confirmText="Delete"
      onConfirm={confirmDeleteComment}
      onCancel={() => setShowConfirm(false)}
      />

    </div>



  );
}
