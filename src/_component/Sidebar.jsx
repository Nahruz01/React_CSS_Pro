// src/_component/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar-card">
      <nav className="nav">
        <h3 className="i-pantun-title">I-Pantun Tools</h3>

        <ul>
          <li><NavLink to="/pantun/pen">Pantun Writer</NavLink></li>
          <li><NavLink to="/pantun/rater">Pantun Rater</NavLink></li>
        </ul>
      </nav>

      <hr />

      <p>This sidebar will show pantun rules, live metrics, or anything you want.</p>
    </div>
  );
}
