// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./_component/NavBar.jsx";
import Home from "./_pages/Home.jsx";
import About from "./_pages/About.jsx";
import Explore from "./_pages/Explore.jsx";
import PantunPen from "./_pages/PantunPen.jsx";

import PantunLayout from "./_layouts/PantunLayout.jsx";

import Rater from "./_pages/PantunRater.jsx";
import Rhymer from "./_pages/PantunRhymer.jsx";
import Class from "./_pages/PantunClass.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />

        // Look at the end is not end fragment
        <Route path="/Explore" element={<Explore />} > //here
        </Route>
        <Route path="/PantunPen" element={<PantunPen />} >
          <Route path="Rater" element={<Rater />} />
          <Route path="Rhymer" element={<Rhymer />} />
          <Route path="Class" element={<Class />} />
        </Route>
      </Routes>
    </>
  );
}
