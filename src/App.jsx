// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./_component/NavBar.jsx";
import Home from "./_pages/Home.jsx";
import About from "./_pages/About.jsx";
import Explore from "./_pages/Explore.jsx";
import PantunPen from "./_pages/PantunPen.jsx";

// Explore sub-pages
import MyPosts from "./_pages/Explore_subpages/MyPosts.jsx";
import Favourites from "./_pages/Explore_subpages/Favourites.jsx";
import Categories from "./_pages/Explore_subpages/Categories.jsx";
import Notifications from "./_pages/Explore_subpages/Notifications.jsx";
import ExploreFeed from "./_pages/Explore_subpages/ExploreFeed.jsx";

// PantunPen sub-pages
import Rater from "./_pages/PantunPen_subpages/PantunRater.jsx";
import Rhymer from "./_pages/PantunPen_subpages/PantunRhymer.jsx";
import Class from "./_pages/PantunPen_subpages/PantunClass.jsx";

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

        <Route path="/PantunPen" element={<PantunPen />} >
          <Route index element={<Rater />} />
          <Route path="Rater" element={<Rater />} />
          <Route path="Rhymer" element={<Rhymer />} />
          <Route path="Class" element={<Class />} />
        </Route>
      </Routes>
    </>
  );
}
