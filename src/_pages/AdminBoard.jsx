import CustomLink from "../_component/CustomLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../_styles/Explore.css";

export default function AdminBoard() {
  return (
    <div className="Explore_Frame">
      <div className="Explore_Barsides"> 
        <nav>
          <ul>
            <CustomLink to="User_Manage">User Management</CustomLink>
            <CustomLink to="Post_Manage">Post Management</CustomLink>
            <CustomLink to="System_Manage">System Management</CustomLink>
            <CustomLink to="Reports">Reports</CustomLink>
            <CustomLink to="Admin_Notification">Notification</CustomLink>
          </ul>
        </nav>
      </div>


      <div className="Explore_CenterCard">
          <Outlet />
      </div>

      <div className="Explore_Barsides">
        <nav>
          <ul>
          </ul>
        </nav>
      </div>
    </div>
  
  )
}
