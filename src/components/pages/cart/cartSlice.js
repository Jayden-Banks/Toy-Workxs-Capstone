// State
const initialState = {
  cart: []
}

// Action Creator = a function that holds an action
export const itemAdded = item => {
  // The object below is called an action
  return {
    type: 'cart/itemAdded',
    payload: item
  }
}
export const itemRemoved = item => {
  // The object below is called an action
  return {
    type: 'cart/itemRemoved',
    payload: item
  }
}

export const clearCart = ()=> {
  // The object below is called an action
  return {
    type: 'cart/clearCart',
  }
}
export const allCart = arrItems=> {
  // The object below is called an action
  return {
    type: 'cart/allCart',
    payload: arrItems
  }
}




// Reducer
export default function cartSlice(state = initialState, action) {
  switch (action.type) {
    case 'cart/itemAdded': {
      return {
        cart: [...state.cart, action.payload]
      }
    }
    case 'cart/itemRemoved': {
      const index = state.cart.indexOf(action.payload)
      const newCart = [...state.cart]
      newCart.splice(index, 1)
      return {
        cart: newCart
      }
    }
    case 'cart/clearCart': {
      return {
        cart: []
      }
    }
    case 'cart/allCart': {
      return {
        cart: action.payload
      }
    }
    default:
      return state
  }
}
