import { useNavigate } from "react-router-dom"
import "./Dashboard.css"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard";
import { productData } from "../Home/data/landing-data";

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(productData);
  }, [products])

  return (
    <div className="dashboard-page">
      <button 
        className="btn create-new__btn" 
        onClick={() => navigate("/new-product")}>
          Create new product
      </button>
      <section className="dashboard__image__section">
        <div className="image__container">
          <div className="round__white" />
          <img src="" />
        </div>
        <h4>Gilbert White</h4>
        <p>gilbertwhite@gmail.com</p>
      </section>
      <section className="manage__products__section">
        <p>Manage products</p>
        <div className="manage__products__container">
          {
            products.map((product) => (
              <ProductCard 
                key={product._id} 
                name={product.name}
                price={product.price}
                image={product.image}
                phone={product.phone}
                id={product._id}
              />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Dashboard