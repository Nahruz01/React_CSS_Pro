// src/_component/NavBar.jsx
import { Link } from "react-router-dom";
import CustomLink from "./CustomLink";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="i-pantun-title">
        I-Pantun
      </Link>

      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/Explore">Explore</CustomLink>
        <CustomLink to="/PantunPen">PantunPen</CustomLink>
        <CustomLink to="/About">About</CustomLink>
      </ul>
    </nav>
  );
}
