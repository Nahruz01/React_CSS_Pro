// src/_component/CustomLink.jsx
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({ to, children, disableActive, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={disableActive ? "" : match ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

