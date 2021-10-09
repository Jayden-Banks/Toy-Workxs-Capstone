import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import plus from '../../../assets/navIcons/plus.png'
import minus from '../../../assets/navIcons/minus.png'
import { itemRemoved } from './cartSlice';



function CartItems({notificationSetter, setTotalPrice, totalPrice}) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const {id} = user
  const [productDisplay, setProductDisplay] = useState([])

  const handleQuantityClick = async (e, productId, quantity) => {
    const body = {
      profileId : user.id,
      productId,
    }
    if(e === "plus") {
    body.quantity = parseInt(quantity) + 1
  }
  else if(e === 'minus') {
    body.quantity = parseInt(quantity) - 1
    }
      try {
        await axios.put("/api/cart", body)
        getCart()
      } catch (err) {
      console.log(err)
      notificationSetter(<h3 className="h3-error-submit">Failed to update Cart</h3>)
      setTimeout(function() {
        notificationSetter('')
      }, 1500)      
    }
}

  const handeleRemoveClick = async(productId) => {
    try {
      const res = await axios.delete("/api/cart/", {params: { id, productId}} )
      console.log(res)
      notificationSetter(res.data)
      dispatch(itemRemoved(productId))
      setTimeout(function() {
        notificationSetter('')
      }, 1500)
      getCart()
    } catch (err) {
      console.log(err)
    }
  }


  const getCart = async() => {
    if(!user) {
      return "No user"
    }
    try {
      const res = await axios.get(`/api/cart/${id}`)      
      formatCart(res.data)
    } catch (err) {
      try {
        const res = await axios.delete(`/api/cart/clear/${user.id}`)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      console.log(err)
    }
  }

  const formatCart = data => {
    let tempTotalPrice = 0
    const dataCopy = [...data]
    const arrDisplay = dataCopy.map((element, index) => {
      let { quantity, name, productId, price, image } = element
      tempTotalPrice += parseFloat(price) * quantity
      return (
        <div className="div-single-cart-item" key={index}>
        <div className="div-image-cart-item div-product-image" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="div-text-cart-item">
          <h3 className="h3-text-cart-item">{name}</h3>
          <h3 className="h3-text-cart-item">Quantity: {quantity}</h3>
          <h3 className="h3-text-cart-item">Price: ${price}</h3>
          <div className="div-buttons-cart-item">
            <input type="image" src={minus} alt="subtract from quantity" onClick={(e) => handleQuantityClick(e.target.value, productId, quantity)} disabled={quantity <= 1 ? "disabled" : false} style={quantity <= 1 ? {filter: "invert(100%)"} : {} } value="minus" className="input-cart-item" width="20px"/>
            <button className="button-remove-cart-item button-cart" onClick={() => handeleRemoveClick(productId)}>Remove</button>
            <input type="image" src={plus} alt="add to quantity" onClick={(e) => handleQuantityClick(e.target.value, productId, quantity)} value="plus" className="input-cart-item" width="20px"/>
          </div>
        </div>
      </div>
      )
    })
    setTotalPrice(tempTotalPrice)
    setProductDisplay(arrDisplay)

  }




  useEffect(() => {
    getCart()
    console.log(user)
  }, [user])
  return (
    <div>
      {productDisplay}
      {/* {productDisplay ? productDisplay : displayCart()} */}
      {/* <DisplayCart /> */}
    </div>
  )
}


export default CartItems
