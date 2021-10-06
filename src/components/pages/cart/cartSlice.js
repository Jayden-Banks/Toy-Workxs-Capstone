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
    default:
      return state
  }
}
