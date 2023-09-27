import { useNavigate } from "react-router-dom"
import "./ProductCard.css"
import { AiOutlinePhone } from "react-icons/ai"

const ProductCard = ({ id, image, price, name, phone }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/product/${id}`);
  }

  return (
    <div className="product__card" onClick={clickHandler}>
        <div className="image__container">
          <img src={image} className="image" />
        </div>
        <div className="product__content">
          <p className="price">₦ {
            parseFloat(
              price?.toFixed(2),
            )?.toLocaleString("en-US")
          }</p>
          <p className="name">{name}</p>
          <p className="phone"><AiOutlinePhone /> {phone}</p>
        </div>
    </div>
  )
}

export default ProductCard