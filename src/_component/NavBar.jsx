import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import CustomLink from "./CustomLink";
import ConfirmModal from "./ConfirmModal.jsx";
import { useAuth } from "../_context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isLocked = !user;

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const lockedClick = (e) => {
    e.preventDefault();
    alert("Please login or continue as guest to access this feature.");
  };

  const confirmLogout = () => {
    logout();                 // clear auth context
    setShowLogoutConfirm(false);
    navigate("/");            // redirect to home
  };

  return (
    <>
      <nav className="nav">
        <Link to="/" className="i-pantun-title">
          I-Pantun
        </Link>

        <ul>
          <CustomLink to="/">Home</CustomLink>

          {isLocked ? (
            <>
              <li
                className="nav-item nav-disabled"
                onClick={lockedClick}
              >
                <span>Explore</span>
              </li>

              <li
                className="nav-item nav-disabled"
                onClick={lockedClick}
              >
                <span>PantunPen</span>
              </li>
            </>
          ) : (
            <>
              <CustomLink to="/Explore">Explore</CustomLink>
              <CustomLink to="/PantunPen">PantunPen</CustomLink>
            </>
          )}

          <CustomLink to="/About">About</CustomLink>

          {user && (
            <CustomLink
              to="#"
              disableActive
              onClick={(e) => {
                e.preventDefault();
                setShowLogoutConfirm(true);
              }}
            >
              Logout
            </CustomLink>
          )}
        </ul>
      </nav>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        open={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}
