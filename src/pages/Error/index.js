import { useEffect } from "react"
import "./Error.css"
import { useLocation, useNavigate } from "react-router-dom"
import Svg404 from "../../assets/404";

const Error = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (/^\/search\/*$/.test(location)) navigate("/")
  }, [location]);

  const btnHandler = () => {
    navigate("/")
  }

  return (
    <div  className="error-page">
      <Svg404 className="svg__404" />
      <button onClick={btnHandler} className="btn error__page__btn">Back to marketplace</button>
    </div>
  )
}

export default Error