import "./Front.css"
import { FaAngleRight, FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import { categoryData } from "../../data/landing-data"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Products from "./Products"

const SERVER = process.env.REACT_APP_SERVER;

const Front = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation().pathname;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (/^\/search\//i.test(location))
      setSearch(location.split("/").pop())
  }, [])

  useEffect(() => {
    if (/^\/search\//i.test(location)) {
      if (location.split("/").pop())
        fetch(`${SERVER}${location}`, {
          method: "GET"
        }).then(res => res.json())
        .then(data => {
          if (data.status === "success")
            setProducts(data.data)
        }).catch(err => {
          
        });
    }
    else if (/^\/category\//i.test(location)) {
      if (location.split("/").pop())
        fetch(`${SERVER}${location}`, {
          method: "GET"
        }).then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status === "success")
            setProducts(data.data)
        }).catch(err => {
          
        });
    }
    else {
      fetch(`${SERVER}/products`, {
        method: "GET"
      }).then(res => res.json())
      .then(data => {
        if (data.status === "success")
          setProducts(data.data)
      }).catch((err) => {
        console.error(err.message);
      })
    }
  }, [location]);

  useEffect(() => {
    setCategory(() => {
      return location.split(/category|\//i).at(-1).toLowerCase();
    });
  }, [category, location]);
  
  const searchFtn = async (e) => {
    e.preventDefault();
    if (search)
      navigate(`/search/${search}`)
    else navigate("/")
  }

  return (
    <>
      <div className="search__section">
        <p>Find anything and contact the vendor immediately</p>
        <form className="search__container" onSubmit={searchFtn}>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="I am looking for..." 
            className="search"
          />
          <button type="submit" className="search__btn">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="products__main">
        <div className="products__category__list">
          {
            Object.entries(categoryData).map((c) => {
              return (
                <Link
                  key={c[0]} 
                  to={c[0] !== "_" ? `/category/${c[0]}` : "/"} 
                  onClick={() => setSearch("")}
                  className={`category ${(() => {
                    if (!category && c[0] === "_") return "selected"
                    const selected = category === c[0] ? "selected" : "";
                    return selected
                  })()}`}
                >
                  <p>{c[1]}</p>
                  <FaAngleRight />
                </Link>
              )
            })
          }
        </div>
        <Products products={products} />
      </div>
    </>
  )
}

export default Front