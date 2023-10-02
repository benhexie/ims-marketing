import { useNavigate } from "react-router-dom"
import "./Dashboard.css"
import { useEffect, useRef, useState } from "react"
import ProductCard from "../../components/ProductCard";
import SvgProfile from "../../assets/Profile";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const SERVER = process.env.REACT_APP_SERVER;

const Dashboard = () => {

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const imageRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${SERVER}/my-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.json())
    .then(data => {
      setLoading(false)
      if (data.status === "success") {
        setUser(data.data.user);
        setProducts(data.data.products);
        return;
      }
      localStorage.removeItem("token");
      navigate("/login");
    }).catch(err => {
      setLoading(false);
    })
  }, []);

  const setProfilePic = async () => {
    if (!imageRef.current) return;
    const formData = new FormData();
    formData.append("image", imageRef.current.files[0]);
    try {
      const response = await fetch(`${SERVER}/upload-pic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      })
      const data = await response.json();
      if (data.status === "error") return toast.error(data.message);
      setUser(prev => ({
        ...prev,
        image: data.data.image
      }))
      toast.success(data.message);
    } catch (err) {
      
    }
  }

  return (
    <>
      {
        !Object.keys(user || {}).length || loading ? (
          <Loading />
        ) : (
          <div className="dashboard-page">
            <button 
              className="btn create-new__btn" 
              onClick={() => navigate("/new-product")}>
                Create new product
            </button>
            <section className="dashboard__image__section">
              <label className="image__container">
                <input 
                  ref={imageRef}
                  onChange={setProfilePic}
                  type="file" 
                  accept=".jpg, .jpeg, .png" 
                  hidden 
                />
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
              </label>
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </section>
            <section className="manage__products__section">
              <p>Manage products</p>
              <div className="manage__products__container">
                {
                  !products.length ? 
                  <p className="npf__text">No product found.</p> :
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
    </>
  )
}

export default Dashboard