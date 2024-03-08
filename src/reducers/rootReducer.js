import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import userReducer from '../store/userSlice ';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
