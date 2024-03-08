import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
