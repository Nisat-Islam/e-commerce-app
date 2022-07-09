import { configureStore } from '@reduxjs/toolkit';
import cartOpenSlice from './cartOpenSlice';
import cartUpdateSlice from './cartUpdateSlice';
import orderSlice from './orderSlice';

const store = configureStore({
  reducer: {
    cartOpen: cartOpenSlice,
    cartUpdate: cartUpdateSlice,
    order: orderSlice,
  },
});
export default store;
