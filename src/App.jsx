import { Component } from "react";
import Navbar from "./_component/NavBar";
import About from "./_pages/About.jsx";
import Explore from "./_pages/Explore.jsx";
import PantunPen from "./_pages/PantunPen.jsx";

export default function App() {
  let Page;
  switch (window.location.pathname) {
    case "/PantunPen":
      Page = PantunPen;
      break;
    case "/Explore":
      Page = Explore;
      break;
    case "/About":
      Page = About;
      break;
    default:
      Page = About;
      break;
  }

  return (
    <>
    <Navbar />
    <Page />

    </>
  );
}
