import { useNavigate } from "react-router-dom"
import "./Dashboard.css"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard";
import SvgProfile from "../../assets/Profile";

const SERVER = process.env.REACT_APP_SERVER;

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER}/my-products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        setUser(data.data.user);
        setProducts(data.data.products);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }).catch(err => {

    })
  }, [])

  return (
    <div className="dashboard-page">
      <button 
        className="btn create-new__btn" 
        onClick={() => navigate("/new-product")}>
          Create new product
      </button>
      <section className="dashboard__image__section">
        <div className="image__container">
          {
            user.image &&
            <div className="round__white" />
          }
          {
            user.image ? (
              <img src={user.image} />
            ) : (
              <SvgProfile />
            )
          }
        </div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
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