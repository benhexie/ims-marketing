import { FaCamera, FaCheckCircle } from "react-icons/fa"
import { categoryData } from "../Home/data/landing-data"
import "./NewProduct.css"
import { useRef, useState } from "react"
import { toast } from "react-toastify";

const SERVER = process.env.REACT_APP_SERVER;

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("cloth");
  const [desc, setDesc] = useState("");
  const [imageState, setImageState] = useState("")
  const imageRef = useRef(null);

  const formHandler = async (e) => {
    e.preventDefault();
    const image = imageRef.current?.files[0];
    
    if (!name || !price || !category || !desc || !image)
    return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", desc);
    formData.append("image", image);
  
    try {
      const response = await fetch(`${SERVER}/product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Product created!");
        return;
      }
      toast.error(data.message)
    } catch (err) {
      toast.warning("Check your internet connection.")
    }
  }

  return (
    <div className='new-product-page'>
      <form className="new-product__form" encType="multipart/form-data" onSubmit={formHandler}>
        <section className="image__section">
            <label>
              {
                !imageState ? (
                  <>
                    <div>
                      <FaCamera className="product__image__icon" />
                    </div>
                  </>
                ) : (
                  <FaCheckCircle className="product__image__icon green" />
                  )
              }
              Product image
              <input 
                ref={imageRef} 
                value={imageState}
                onChange={(e) => setImageState(e.target.value)}
                hidden 
                type="file" 
                accept=".jpg, .jpeg, .png" />
            </label>
        </section>
        <section className="details__section">
          <label>
            Product name
            <input 
              className="custom__input" 
              placeholder="Glass mug"
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Product price (₦)
            <input 
              className="custom__input" 
              placeholder="14,000"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label>
            Product category
            <select 
              className="custom__input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              {
                Object.entries(categoryData)
                .filter((c) => !/_/.test(c[0]))
                .map((c, i) => <option key={i} value={c[0]}>{c[1]}</option>)
              }
            </select>
          </label>
          <label>
            Product description
            <textarea 
              className="custom__input product__desc" 
              placeholder="Fine white procelean glass mug with rare design..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)} />
          </label>
          <button className="btn product__btn" type="submit">Create new product</button>
        </section>
      </form>
    </div>
  )
}

export default NewProduct