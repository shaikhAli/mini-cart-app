import './App.css';
import Navbar from './pages/Navbar';
import Cart from './pages/Cart'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as CONSTANTS from './config/constants';

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  
    /* 
    * Initial API call for cart items- restrict the API call when all cart item are removed
    */
    if (cartItems == null) {
      getCartData()
    } else {
      setProducts(cartItems);
    }

  }, []);

  /*
  * Get cart items from the API
  */
  const getCartData = () => {
    axios.get(CONSTANTS.GET_PRODUCTS)
      .then(response => {
        let productList = response.data.products;
        let productWithQtyList = productList.map(v => ({ ...v, quantity: 1 }));
        localStorage.setItem("cartItems", JSON.stringify(productWithQtyList));
        setProducts(productWithQtyList);
      })
  }

  /*
  * Cart quantity to be added/subtracted
  */
  const handleCart = (type, id) => {

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let objIndex = cartItems.findIndex((obj => obj.id === id));
    let currentQuantity = cartItems[objIndex].quantity;
    let updatedQuantity = (type === "add" ? currentQuantity + 1 : currentQuantity - 1);

    cartItems[objIndex].quantity = updatedQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setProducts(cartItems);
  }

  /*
  * Cart data will be reset - data wil be fetched via API
  */
  const handleResetCart = () => {
    localStorage.removeItem("cartItems");
    getCartData();
  }

  /* 
  * Cart items to be removed
  */
  const handleRemoveCart = (id) => {

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    let newCartItem = cartItems.filter((item) => {
      return item.id !== id;
    })

    localStorage.setItem("cartItems", JSON.stringify(newCartItem));
    setProducts(newCartItem);
  }

  return (
    <div className="app">
      <Navbar
        products={products} // cart items as array
        removeFromCart={handleRemoveCart}
      />
      <Cart
        products={products} // cart items as array
        updateCart={handleCart}
        resetCartData={handleResetCart}
      />
    </div>
  );
}

export default App;
