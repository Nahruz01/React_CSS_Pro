// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./_component/NavBar.jsx";
import Home from "./_pages/Home.jsx";
import About from "./_pages/About.jsx";
import Explore from "./_pages/Explore.jsx";
import PantunPen from "./_pages/PantunPen.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/PantunPen" element={<PantunPen />} />
      </Routes>
    </>
  );
}
