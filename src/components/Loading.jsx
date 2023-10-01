import "./Loading.css"
import { ScaleLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="loading-page">
        <ScaleLoader color="var(--primary-color)" />
    </div>
  )
}

export default Loading