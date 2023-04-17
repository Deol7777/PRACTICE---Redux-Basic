import { createSlice } from "@reduxjs/toolkit";
import CartItem from "../components/Cart/CartItem";


const updateTotal = (state, price, type) =>
{
    if(type === "increase")
    {
    state.total += price;
    }
    else
    {
        state.total -= price;
    }

}
const cartSlice = createSlice({
  name: "cart",
  initialState: { itemList: [], total :0 },
  reducers: {
    addItem(state, action) {
      console.log("ID received in the reducer: " + action.payload);
      //if the itemis already found
      const item = state.itemList.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity++;
        updateTotal(state, item.price, "increase");
      } else {
        state.itemList.push({
          id: action.payload.id,
          title: action.payload.title,
          quantity: 1,
          price: action.payload.price,
        });
        updateTotal(state, action.payload.price, "increase");
      }

      //state.itemList.push(tempCartItem);
    },
    increaseCartAmount(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      item.quantity++;
      updateTotal(state, item.price, "increase");
    },

    decreaseCartAmount(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      if (item.quantity === 1) {
        const index = state.itemList.indexOf(item);
        state.itemList.splice(index, 1);
      } else {
        item.quantity--;
      }
      updateTotal(state, item.price, "decrease");
    },

    deleteFromCart(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      state.itemList.splice(state.itemList.indexOf(item), 1);
      updateTotal(state, item.price * item.quantity, "decrease");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
