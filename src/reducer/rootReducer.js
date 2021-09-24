import { combineReducers } from 'redux'

// Temporary to get store working
import cartSlice from '../components/cart/cartSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named 'cart', handled by 'cartSlice'
  cart: cartSlice,
})

export default rootReducer