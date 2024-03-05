import { createSlice } from '@reduxjs/toolkit';

const comentariosSlice = createSlice({
  name: 'comentarios',
  initialState: {},
  reducers: {
    agregarComentario: (state, action) => {
      const { _id, id } = action.payload;
      if (!state[_id]) {
        state[_id] = new Set();
      }
      state[_id].add(id);
    },
  },
});

export const { agregarComentario } = comentariosSlice.actions;
export default comentariosSlice.reducer;