// src/_pages/Explore.jsx
import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import "../_styles/Explore.css";

export default function Explore() {
  return (
    <div className="Explore_Frame">
      <nav className="Explore_LeftBar">
        <ul>
          <li>My Posts</li>
          <li>Favourites</li>
          <li>Categories</li>
          <li>Notification</li>
        </ul>
      </nav>

      <div className="Explore_CenterCard">
        <p>Posts</p>

        <div className="Post_Card">
          <h4>AuthorName</h4>
          <div className="Post_Content">
          <h3>Pantun Title 1</h3>
          <h3>Tag</h3>
          <p>Line 1 of the pantun...</p>
          <p>Line 2 of the pantun...</p>
          <p>Line 3 of the pantun...</p>
          <p>Line 4 of the pantun...</p>
          </div>
          <div className="Post_Buttons">
          <button>Like</button>
          <button>Comment</button>
          </div>
        </div>

      </div>

      <div className="Explore_RightBar">
        <p>Trending Tags</p>
        <p>Daily Themes</p>
        <p>Challenges</p>
      </div>
    </div>
  
  )
}
