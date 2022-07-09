import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
  },
  reducers: {
    orderItem(state, action) {
      state.order = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
