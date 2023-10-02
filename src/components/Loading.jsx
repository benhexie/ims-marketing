import "./Loading.css"
import { ScaleLoader } from "react-spinners"

const Loading = ({ toplevel=false }) => {
  return (
    <div 
      className="loading-page" 
      style={ toplevel ? { minHeight: "100vh" } : {} }>
        <ScaleLoader 
          color="var(--primary-color)" />
    </div>
  )
}

export default Loading