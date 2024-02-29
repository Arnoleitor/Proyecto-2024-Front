import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
  items: [],
};

const showSuccessMessage = (text) => {
  message.success(text);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      showSuccessMessage('Producto añadido al carrito');
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);  
    },   
    clearCart: (state) => {
      state.items = [];
    },
    incrementItemQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },

    decrementItemQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item._id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { addItem, removeItem, clearCart, incrementItemQuantity, decrementItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
