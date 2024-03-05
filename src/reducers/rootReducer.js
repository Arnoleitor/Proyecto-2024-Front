import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../featues/cartSlice';
import userReducer from '../featues/userSlice ';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
