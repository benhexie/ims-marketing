import "./Landing.css"
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

const Landing = () => {
  const [search, setSearch] = useState("");

  const searchFtn = (e) => {
    e.preventDefault();

  }
  
  return (
    <div className="landing-page">
      <nav className="nav">
        <h4 className="title">IMS MARKETING</h4>
        <Link to={"login"} className="nav__item login">
          Login
        </Link>
        <Link to={"signup"} className="nav__item">
          Create an account
        </Link>
      </nav>
      <div className="search__section">
        <p>Find anything and contact the vendor immediately</p>
        <form className="search__container" onSubmit={searchFtn}>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="I am looking for..." 
            className="search"
          />
          <button type="submit" className="search__btn">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Landing