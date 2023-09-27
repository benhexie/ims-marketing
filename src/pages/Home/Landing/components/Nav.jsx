import "./Nav.css"
import { Link, useNavigate } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn }) => {

    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/login")
    }

  return (
    <nav className="nav">
        <h4 className="title">IMS MARKETING</h4>
        {
            !loggedIn ? (
                <>
                    <Link to={"login"} className="nav__item login">
                        Login
                    </Link>
                    <Link to={"signup"} className="nav__item">
                        Create an account
                    </Link>
                </>
            ) : (
                <>
                    <Link to={"dashboard"} className="nav__item login">
                        Go to dashboard
                    </Link>
                    <Link onClick={logout} className="nav__item">
                        Log Out
                    </Link>
                </>
            )
        }
    </nav>
  )
}

export default Nav