import { useEffect, useState } from "react";
import "./Products.css"
import ProductCard from "../../../../../components/ProductCard"
import { useLocation, useOutletContext } from "react-router-dom";

const Products = ({ products = [] }) => {
    const [category, setCategory] = useState("");
    const [specificProducts, setSpecificProducts] = useState([]);
    const location = useLocation().pathname;

    useEffect(() => {
        setCategory(() => {
          return location.split(/category|\//i).pop().toLowerCase();
        });
    }, [category, location]);
    
    useEffect(() => {
    const newProducts = products
        .filter((product) => {
        return /^_{0,1}$/.test(category) || product.category === category
        })
        .map((product) => {
        return <ProductCard 
            key={product._id} 
            name={product.name}
            price={product.price}
            image={product.image}
            phone={product.phone}
            id={product._id}
        />
        });
    setSpecificProducts(newProducts)
    }, [category]);

  return (
    <div className="scroll__container products__scroll">
        <div className="products__container">
        {
            !specificProducts.length ?
            <p className="npf__text">No product found.</p> :
            specificProducts
        }
        </div>
    </div>
  )
}

export default Products