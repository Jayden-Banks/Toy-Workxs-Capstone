import axios from "axios";
import React, { useEffect, useState } from "react";
import strategoImage from "../../../assets/product-test/stratego.jpeg";
import { useSelector, useDispatch} from "react-redux";
import { itemAdded, itemRemoved } from "../cart/cartSlice";




function GenreDisplay() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const {id} = user
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)


  const handleAddClick = async({id: productId}) => {

    console.log(productId, user.id)
    const body = {
      profileId: user.id,
      productId
    }
    try {
      const res = await axios.post("/api/cart", body)
      console.log(res)
      dispatch(itemAdded(productId))

    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveClick = async({id: productId}) => {
    console.log("removeClick")
    try {
      const res = await axios.delete("/api/cart/", {params: { id, productId} })
      console.log(res, 'responsse')
      dispatch(itemRemoved(productId))
    } catch (err) {
      console.log(err)
    } 
  }


  // Makes the initial axios get request for ALL products
  const callProducts = async () => {
    try {
      const res = await axios.get("/api/boardgames/");
      await setAllProducts(res.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Sorts full list of products by genre into an obj with genre keys of product arrays
  const GenreSort = () => {
    const copy = [...allProducts];
    const productsGenres = {};
    copy.map((product) => {
      if (productsGenres[product.genre]) {
        productsGenres[product.genre].push(product);
      } else {
        productsGenres[product.genre] = [product];
      }
    });
    return allDisplay(productsGenres);
  };

  // Creates JSX for each genre key on the page
  const allDisplay = (displayThis) => {
    const productsGenre = { ...displayThis };
    let addGenreProducts;
    const fullProducts = [];
    for (const genre in productsGenre) {
      const arrProducts = [];
      arrProducts.push(categoryDisplay(productsGenre[genre]));
      addGenreProducts = (
        <div className="div-genre-group" key={genre}>
          <h3 className="h3-genre-headers">{genre}</h3>
          <div className="div-multiple-products">{arrProducts}</div>
        </div>
      );
      fullProducts.push(addGenreProducts);
    }
    return fullProducts;
  };

  // Creates individual JSX for each product
  const categoryDisplay = (arr) => {
    const resArray = arr.map((element, index) => {
      const { id, name, price, image } = element;
      return (
        <div className="div-individual-product" key={index}>
          <div
            className="div-product-image"
            style={{ backgroundImage: `url(${strategoImage})` }}
          ></div>
          <h4 className="h4-product-title">{name}</h4>
          <h4 className="h4-product-title">Price: ${price}</h4>
          {cart.includes(id) ?  <button className="button-product-add" onClick={() => handleRemoveClick(element)}>Remove</button> : <button className="button-product-add" onClick={() => handleAddClick(element)}>ADD</button>}
        </div>
      );
    });
    return resArray;
  };

  useEffect(() => {
    callProducts();
  }, []);

  return <div>{loading ? <GenreSort /> : <h2>Loading</h2>}</div>;
}
export default GenreDisplay;
