import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../featues/cartSlice';
import userReducer from '../featues/userSlice ';
import comentariosReducer from '../featues/comentariosSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  comentarios: comentariosReducer
});

export default rootReducer;
