// src/_pages/Explore.jsx
import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import "../_styles/Explore.css";

export default function Explore() {

  return (
    <div className="Explore_Frame">
      <div className="Explore_Barsides"> 
        <nav className="explore-nav">
          <ul>
            <CustomLink to="MyPosts">My Posts</CustomLink>
            <CustomLink to="ExploreFeed">Explore Feed</CustomLink>
            <CustomLink to="Favourites">Favourites</CustomLink>
            <CustomLink to="Categories">Categories</CustomLink>
            <CustomLink to="Notifications">Notification</CustomLink>
          </ul>
        </nav>
      </div>


      <div className="Explore_CenterCard">
          <Outlet />
      </div>

      <div className="Explore_Barsides">
        <nav>
          <ul>
            <CustomLink to="">Trending</CustomLink>
            <CustomLink to="">Daily Themes</CustomLink>
            <CustomLink to="/ChallengesPantunPen">Challenges</CustomLink>
            <CustomLink to="">Pantun Class</CustomLink>
          </ul>
        </nav>
      </div>
    </div>
  
  )
}
