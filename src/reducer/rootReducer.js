import { combineReducers } from "redux";

// Temporary to get store working
import cartSlice from "../components/pages/cart/cartSlice";
import userSlice from "../components/pages/login/userSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named 'cart', handled by 'cartSlice'
  cart: cartSlice,
  user: userSlice,
});

export default rootReducer;
