import { useEffect } from "react"
import "./Error.css"
import { useLocation, useNavigate } from "react-router-dom"

const Error = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (/^\/search\/*$/) navigate("/")
  }, [location]);
  return (
    <div>Error</div>
  )
}

export default Error