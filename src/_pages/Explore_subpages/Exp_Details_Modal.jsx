// src/_pages/Explore_subpages/PostDetailsModal.jsx

import "../../_styles/Exp_Details.css";

export default function Exp_Details_Modal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>
          <strong>Title:</strong> {post.title}
        </h2>

        <div className="infoList">
        <p><strong>Creator:</strong> {post.username || "Anonymous"}</p>
        <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}</p>
        <p><strong>Rating:</strong> {post.rating_avg ? post.rating_avg.toFixed(2) : "No ratings yet"}</p>
        <p><strong>Tags:</strong> {post.tags || "No tags"}</p>
        </div>
        
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
