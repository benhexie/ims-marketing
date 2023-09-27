import "./Front.css"
import { FaAngleRight, FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import { categoryData } from "../../data/landing-data"
import { productData } from "../../data/landing-data"
import { Link, useLocation } from "react-router-dom"
import Products from "./Products"

const Front = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation().pathname;

  const searchFtn = (e) => {
    e.preventDefault();

  }

  useEffect(() => {
    setCategory(() => {
      return location.split(/category|\//i).at(-1).toLowerCase();
    });
  }, [category, location]);

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
                  to={`/category/${c[0]}`} 
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
        <Products products={productData} />
      </div>
    </>
  )
}

export default Front