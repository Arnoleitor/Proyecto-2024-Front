import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nombre: '',
    direccion: '',
    email: '',
  },
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setUserData: (state, action) => {
      return {
       ...state,
       ...action.payload,
     };
   },
   clearUserData: () => null,
  },
});

export const { updateUser, setUserData, clearUserData } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
