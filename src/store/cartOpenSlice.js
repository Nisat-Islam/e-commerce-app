import { createSlice } from '@reduxjs/toolkit';

const cartOpenSlice = createSlice({
  name: 'cartOpenSlice',
  initialState: {
    cartOpen: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartOpen = !state.cartOpen;
    },
  },
});
export const cartOpenActions = cartOpenSlice.actions;
export default cartOpenSlice.reducer;
