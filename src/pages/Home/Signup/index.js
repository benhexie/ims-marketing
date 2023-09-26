import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import { FaEnvelope, FaEye, FaEyeSlash, FaHome, FaLock, FaUser } from "react-icons/fa"
import { useState } from "react";

const Signup = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="login-page signup-page">
      <div className="to-home__container" onClick={() => navigate("/")}>
        <FaHome />
      </div>
      <div className="title__container">
        <h1>IMS MARKETING</h1>
        <p>Find everything in one click and contact the vendor immediately</p>
      </div>
      <div className="login__container">
        <h1 className="login__title">Sign up</h1>
        <div className="login__content">
          <form className="login__form" onSubmit={signupHandler}>
            <div className="input__container">
              <div className="input__icon__container">
                <FaUser />
              </div>
              <input
                autoFocus
                required
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div className="input__container">
              <div className="input__icon__container">
                <FaEnvelope />
              </div>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail" 
              />
            </div>
            <div className="input__container">
              <div className="input__icon__container">
                <FaLock />
              </div>
              <div 
                className="input__icon__container eye__icon__container" 
                onClick={() => setShowPassword(prev => !prev)}
              >
                { showPassword ? <FaEyeSlash /> : <FaEye /> }
              </div>
              <input
                className="input__container password" 
                required
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
              />
            </div>
            <div className="input__container">
              <div className="input__icon__container">
                <FaLock />
              </div>
              <input
                className="input__container confirm__password" 
                required
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password" 
              />
            </div>
            <button type="submit">Create Account</button>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup