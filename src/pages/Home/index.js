import { Outlet } from "react-router-dom"
import "./Home.css"

const Home = (props) => {
  return (
    <div className="home-page">
        <Outlet context={{...props}} />
    </div>
  )
}

export default Home