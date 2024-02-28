import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../featues/cartSlice';
import userReducer  from '../featues/userSlice ';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
})