// src/_component/NavBar.jsx

export default function Navbar() {
  return (
    <nav className="nav">
        <a href="/" className="i-pantun-title"> 
            I-Pantun 
        </a>
        <ul>
            <CustomLink href="/">Home</CustomLink>
            <CustomLink href="/Explore">Explore</CustomLink>
            <CustomLink href="/PantunPen">PantunPen</CustomLink>    
            <CustomLink href="/About">About</CustomLink>
        </ul>
    </nav>
  );
}

function CustomLink({ href, children }) {
    const pathname = window.location.pathname;

    return (
        <li className={pathname === href ? "active" : ""}>
            <a href={href}>{children}</a>
        </li>
    );
}