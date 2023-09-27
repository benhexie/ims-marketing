import { useLocation, useNavigate } from "react-router-dom"
import "./Product.css"
import { useEffect, useState } from "react"
import { FaAngleLeft } from "react-icons/fa"

const Product = () => {

  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [productId, setProductId] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProductId(location.split("/").pop())
  }, [location]);

  const goback = () => {
    navigate(-1);
  }

  return (
    <div className="product-page">
        <div className="product__container">
          <button className="btn back__btn" onClick={goback}>
            <FaAngleLeft className="icon" />
          </button>
          <div className="image__container">
            <img src="" />
          </div>
          <section>
            <h4>Polo Shirt</h4>
            <p>₦ 9,000</p>
            <p>Description</p>
            <p>lorem ipsum</p>
          </section>
        </div>
        <div className="contact__container">
          <section className="contact__image__section">
            <div className="image__container">
              <img src="" />
            </div>
            <p>Gregor Martins</p>
          </section>
          <section className="contact__details__section">
            <p>Contact details</p>
            <p>09038043846</p>
            <p>benedictgabriel73@gmail.com</p>
          </section>
          <section className="contact__location__section">
            <p>Location</p>
            <p>Abuja, FCT</p>
          </section>
        </div>
    </div>
  )
}

export default Product