//  src/_pages/Home.jsx
import RegisterModal from "./Home_subpages/Register.jsx"
import "../_styles/Home.css";

import welcomeImage from "../_assets/_HomePage/I-Pantun.png"
import image1 from "../_assets/_HomePage/ZAMAN_SEKOLAH.png"
import image2 from "../_assets/_HomePage/SUASANA_DESA.png"
import image3 from "../_assets/_HomePage/SEJARAH.png"
import image4 from "../_assets/_HomePage/RUMAH_KELUARGA.png"
import logo from "../_assets/_HomePage/Logo-I-Pantun.png"

import AutoCarousel from "../_component/AutoCarousel.jsx";

import { useState } from "react";

import { useAuth } from "../_context/AuthContext.jsx";


export default function Home() {
  const { user, login, loginAsGuest } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAdmin = user?.role === "admin";


  const [showRegister, setShowRegister] = useState(false);

  const test = () => {
    alert("button is working!");
  };

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.user_id) {
      login({
        user_id: data.user_id,
        username: data.username,
        role: data.role
      });
      alert("Login successful");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="Home_Frame">
      <div className="Home_WelcomeCard">
        <div className="Home_ImageGallery">
          <AutoCarousel
            images={[welcomeImage, image1, image2, image3]}
            interval={3000} // 3000: 3 seconds
          />

          {/* <img src={welcomeImage} alt="opener"/>
          <img src={image1} alt="img1" />
          <img src={image2} alt="img2" />
          <img src={image3} alt="img3" /> */}
        </div>

      </div>
      <div className="Home_RegLogCard">
        <img src={logo} alt="logo_i-Pantun" />



        
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/><br></br>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>
        <button className="login-button" onClick={handleLogin}>Login</button><br></br>
        <button className="register-button" onClick={() => setShowRegister(true)}>Register</button>
        <button className="guest-button" onClick={loginAsGuest}>Login as Guest</button>

        {showRegister && (
          <RegisterModal onClose={() => setShowRegister(false)} />
        )}

        {/* Locked section */}
        {user && (
          <p>This text is only visible when logged in.</p>
        )}

        {!user && (
          <p>Please log in or continue as guest to access features.</p>
        )}

        {user && (
          <p>Welcome, {user.username}</p>
        )}

        
      </div>
    </div>
  );
}

