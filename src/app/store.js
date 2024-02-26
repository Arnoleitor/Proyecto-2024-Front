import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../featues/cartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})