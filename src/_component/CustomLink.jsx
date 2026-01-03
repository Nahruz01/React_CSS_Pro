// src/_component/CustomLink.jsx
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLink({
  to,
  children,
  disableActive,
  className = "",
  ...props
}) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  const liClass = [
    className,
    !disableActive && match ? "active" : ""
  ].join(" ").trim();

  return (
    <li className={liClass}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}


