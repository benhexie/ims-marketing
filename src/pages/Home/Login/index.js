import { Link, useNavigate, useOutletContext } from "react-router-dom"
import "./Login.css"
import { FaEnvelope, FaEye, FaEyeSlash, FaHome, FaLock } from "react-icons/fa"
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SERVER = process.env.REACT_APP_SERVER;

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const context = useOutletContext();

  useEffect(() => {
    if (context && context.loggedIn) {
      setTimeout(() => {
        navigate("/");
      }, 2000)
    }
  }, [context])

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        context && context.setLoggedIn(true);
        toast.success("Logged in");
      }
    } catch (err) {
      
    }
  }

  return (
    <div className="login-page">
      <div className="to-home__container" onClick={() => navigate("/")}>
        <FaHome />
      </div>
      <div className="title__container">
        <h1>IMS MARKETING</h1>
        <p>Find everything in one click and contact the vendor immediately</p>
      </div>
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <div className="login__content">
          <form className="login__form" onSubmit={loginHandler}>
            <div className="input__container">
              <div className="input__icon__container">
                <FaEnvelope />
              </div>
              <input 
                autoFocus
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
            <div className="remember-me__container">
              <label>
                <input 
                  checked={remember}
                  onChange={(e) => setRemember(prev => !prev)}
                  type="checkbox" 
                />
                Remember me
              </label>
              <Link to={"#"}>Forgot password?</Link>
            </div>
            <button className="btn" type="submit">Login</button>
            <p>Don't have an account? <Link to={"/signup"}>Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login