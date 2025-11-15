// src/_component/NavBar.jsx
import { Link, useLocation } from "react-router-dom";

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

function CustomLink({ to, children }) {
  const location = useLocation();
  return (
    <li className={location.pathname === to ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
