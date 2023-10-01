import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Product.css"
import { useEffect, useState } from "react"
import { FaAngleLeft, FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa"

const SERVER = process.env.REACT_APP_SERVER;

const Product = () => {

  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch(`${SERVER}${location}`, {
      method: "GET"
    }).then(res => res.json())
    .then(data => {
      setLoading(false);
      if (data.status === "success") {
        setProduct(data.data);
        return;
      }
    }).catch(err => {
      console.error(err.message);
      setLoading(false);
    })
  }, [location]);

  const goback = () => {
    navigate(-1);
  }

  return (
    <div className="product-page">
      <div className="product__container">
        <div className="product__content">
          <button className="btn back__btn" onClick={goback}>
            <FaAngleLeft className="icon" />
          </button>
          <div className="image__container">
            <img src={product.image} />
          </div>
          <section className="product__details__section">
            <p className="title">{product.name}</p>
            <p>₦ {product.price?.toLocaleString("en-US")}</p>
            <p className="title">Description</p>
            <p>{product.description}</p>
          </section>
        </div>
        <div className="contact__container">
          <section className="contact__details__item contact__image__section">
            <div className="image__container">
              <img src={product.user_image} />
            </div>
            <p>{product.user_name}</p>
          </section>
          <section className="contact__details__item contact__details__section">
            <p className="contact__section__title">Contact details</p>
            <Link to={`tel:${product.phone}`}>
              <FaPhone />
              <p>{product.phone}</p>
            </Link>
            <Link to={`mailto:${product.email}`}>
              <FaEnvelope />
              <p>{product.email}</p>
            </Link>
          </section>
          <section className="contact__details__item contact__location__section">
            <p className="contact__section__title">Location</p>
            <Link>
              <FaLocationArrow />
              <p>{product.location}</p>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Product