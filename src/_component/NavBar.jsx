// src/_component/NavBar.jsx
import { Link, useMatch, useResolvedPath } from "react-router-dom";

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
  // Resolve the path relative to current location
  const resolved = useResolvedPath(to);
  // Match the resolved path exactly
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
