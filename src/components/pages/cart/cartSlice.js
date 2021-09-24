// State
const initialState = {
  cart: ''
}

// Action Creator = a function that holds an action
export const itemAdded = item => {
  // The object below is called an action
  return {
    type: 'cart/itemAdded',
    payload: item
  }
}


// Reducer
export default function cartSlice(state = initialState, action) {
  switch (action.type) {
    case 'cart/itemAdded': {
      return {
        item: action.payload
      }
    }
    default:
      return state
  }
}
