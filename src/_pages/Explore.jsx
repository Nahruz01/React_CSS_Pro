// src/_pages/Explore.jsx
import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import "../_styles/Explore.css";

export default function Explore() {

  const samplePosts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    author: "Author " + (i + 1),
    title: "Pantun Title " + (i + 1),
    tag: "love",
    lines: [
      "Line 1 of pantun...",
      "Line 2 of pantun...",
      "Line 3 of pantun...",
      "Line 4 of pantun..."
    ]
  }));

  return (
    <div className="Explore_Frame">
      <div className="Explore_LeftBar"> 
        <nav>
          <ul>
            <li><CustomLink to="MyPosts">My Posts</CustomLink></li>
            <li><CustomLink to="ExploreFeed">Explore Feed</CustomLink></li>
            <li><CustomLink to="Favourites">Favourites</CustomLink></li>
            <li><CustomLink to="Categories">Categories</CustomLink></li>
            <li><CustomLink to="Notifications">Notification</CustomLink></li>
          </ul>
        </nav>
      </div>


      <div className="Explore_CenterCard">
          <Outlet />
      </div>

      <div className="Explore_RightBar">
        <p>Trending Tags</p>
        <p>Daily Themes</p>
        <p>Challenges</p>
      </div>
    </div>
  
  )
}
