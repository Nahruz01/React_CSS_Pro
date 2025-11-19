//  src/_pages/Home.jsx
import "../_styles/Home.css";

export default function Home() {
  return (
    <div className="Home_Frame">
      <div className="Home_WelcomeCard">
        <h1>Welcome to I-Pantun</h1>
        <p>Your ultimate pantun creation and exploration platform!</p>
      </div>
      <div className="Home_RegLogCard">
        <input type="text" placeholder="Username" /><br></br>
        <input type="password" placeholder="Password" /><br></br>
        <button className="login-button">Login</button><br></br>
        <button className="register-button">Register</button>
      </div>


    </div>
  );
}