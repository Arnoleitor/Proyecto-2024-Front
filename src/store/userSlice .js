import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserData: (state, action) => {
       return {
        ...state,
        ...action.payload,
      };
    },
    clearUserData: () => null,
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
