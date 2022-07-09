import { createSlice } from '@reduxjs/toolkit';

let item = JSON.parse(localStorage.getItem('items'));
let itemId = JSON.parse(localStorage.getItem('itemsId'));
let totalQuantity = JSON.parse(localStorage.getItem('totalQuantity'));
let totalProductPrice = JSON.parse(localStorage.getItem('totalProductPrice'));

const cartUpdateSlice = createSlice({
  name: 'cartUpdateSlice',
  initialState:
    item && totalQuantity && totalProductPrice
      ? {
          items: item,
          totalQuantity: totalQuantity,
          totalProductPrice: totalProductPrice,
          itemsId: itemId,
        }
      : {
          items: [],
          itemsId: [],
          totalQuantity: 0,
          totalProductPrice: 0,
        },

  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity++;
      state.totalProductPrice = +state.totalProductPrice + +newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          totalPrice: newItem.price,
          img: newItem.imageURL,
          quantity: 1,
        });
        state.itemsId.push(newItem.id);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = +existingItem.totalPrice + +newItem.price;
      }
      localStorage.setItem('items', JSON.stringify(state.items));
      localStorage.setItem('itemsId', JSON.stringify(state.itemsId));
      localStorage.setItem(
        'totalQuantity',
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem(
        'totalProductPrice',
        JSON.stringify(state.totalProductPrice + 2.5)
      );
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity--;
      state.totalProductPrice = +state.totalProductPrice - +existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.itemsId = state.itemsId.filter((itemId) => itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage.setItem('items', JSON.stringify(state.items));
      localStorage.setItem('itemsId', JSON.stringify(state.itemsId));
      localStorage.setItem(
        'totalQuantity',
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem(
        'totalProductPrice',
        JSON.stringify(state.totalProductPrice + 2.5)
      );
    },
    clearCart(state) {
      state.items = [];
      state.itemsId = [];
      state.totalQuantity = 0;
      state.totalProductPrice = 0;
      localStorage.clear();
    },
  },
});

export const cartUpdateActions = cartUpdateSlice.actions;
export default cartUpdateSlice.reducer;
