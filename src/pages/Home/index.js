import { Outlet } from "react-router-dom"
import "./Home.css"
import Nav from "./components/Nav"

const Home = () => {
  return (
    <div className="home-page">
        <Nav />
        <Outlet />
    </div>
  )
}

export default Home