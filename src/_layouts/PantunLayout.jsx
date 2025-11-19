// src/_layouts/PantunLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../_component/Sidebar.jsx";
import "../_styles/PantunPen.css";

export default function PantunLayout() {
  return (
    <div className="pantun-container">

      <h1>Pantun Workspace</h1>

      {/* 80% | 20% layout */}
      <div className="pantun-layout">

        {/* LEFT 80% */}
        <div className="center-card">
          
        </div>

        {/* RIGHT 20% */}

      </div>
    </div>
  );
}
