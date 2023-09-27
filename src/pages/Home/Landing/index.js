import Nav from "./components/Nav"
import "./Landing.css"
import { Outlet, useOutletContext } from "react-router-dom"

const Landing = () => { 
  const context = useOutletContext();
  console.log(context);
  return (
    <div className="landing-page">
      <Nav { ...context } />
      <Outlet context={{...context}} />
    </div>
  )
}

export default Landing