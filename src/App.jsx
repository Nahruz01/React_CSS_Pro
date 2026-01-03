// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./_component/NavBar.jsx";
import Home from "./_pages/Home.jsx";
import About from "./_pages/About.jsx";
import Explore from "./_pages/Explore.jsx";
import PantunPen from "./_pages/PantunPen.jsx";

import AdminRoute from "./_component/AdminRoute";
import AdminBoard from "./_pages/AdminBoard";

// Explore sub-pages
import MyPosts from "./_pages/Explore_subpages/MyPosts.jsx";
import Favourites from "./_pages/Explore_subpages/Favourites.jsx";
import Categories from "./_pages/Explore_subpages/Categories.jsx";
import Notifications from "./_pages/Explore_subpages/Notifications.jsx";
import ExploreFeed from "./_pages/Explore_subpages/ExploreFeed.jsx";

import ChallengesPantunPen from "./_pages/Game_pages/ChallengesPantunPen.jsx";
import Challenge_Info from "./_pages/Game_pages/Challenge_Info.jsx";

// PantunPen sub-pages
import Rater from "./_pages/PantunPen_subpages/PantunRater.jsx";
import Rhymer from "./_pages/PantunPen_subpages/PantunRhymer.jsx";
import Class from "./_pages/PantunPen_subpages/PantunClass.jsx";

// AdminBoard sub-pages
import UserManagement from "./_pages/Admin_subpages/User_Management.jsx";
import PostManagement from "./_pages/Admin_subpages/Post_Management.jsx";
import SystemManagement from "./_pages/Admin_subpages/System_Management.jsx";
import Reports from "./_pages/Admin_subpages/Reports.jsx";
import Admin_Notification from "./_pages/Admin_subpages/Admin_Notifications.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        
        {/* Look at the end is not end fragment */}
        <Route path="/Explore" element={<Explore />} >
          <Route index element={<ExploreFeed />} />
          <Route path="MyPosts" element={<MyPosts />} />
          <Route path="ExploreFeed" element={<ExploreFeed />} />
          <Route path="Favourites" element={<Favourites />} />
          <Route path="Categories" element={<Categories />} />
          <Route path="Notifications" element={<Notifications />} />
        </Route>

        <Route path="/ChallengesPantunPen" element={<ChallengesPantunPen/>} >
          <Route index element={<Challenge_Info />} />
          <Route path="Challenge_Info" element={<Challenge_Info />} />
          <Route path="Rater" element={<Rater />} />
          <Route path="Rhymer" element={<Rhymer />} />
          <Route path="Class" element={<Class />} /> 
        </Route>
        
        <Route path="/PantunPen" element={<PantunPen key="new"/>} >
          <Route index element={<Rater />} />
          <Route path="Rater" element={<Rater />} />
          <Route path="Rhymer" element={<Rhymer />} />
          <Route path="Class" element={<Class />} /> 
        </Route>

        <Route path="/pantunpen/:postId/edit" element={<PantunPen editMode={true} />} >
          <Route index element={<Rater />} />
          <Route path="Rater" element={<Rater />} />
          <Route path="Rhymer" element={<Rhymer />} />
          <Route path="Class" element={<Class />} /> 
        </Route>

        <Route
          path="/AdminBoard"
          element={
            <AdminRoute>
              <AdminBoard />
            </AdminRoute>
          }
        >
          <Route index element={<PostManagement />} />
          <Route path="User_Manage" element={<UserManagement />} />
          <Route path="Post_Manage" element={<PostManagement />} />
          <Route path="System_Manage" element={<SystemManagement />} />
          <Route path="Reports" element={<Reports />} />
          <Route path="Admin_Notification" element={<Admin_Notification />} />
        </Route>

        

      </Routes>




    </>
  );
}
