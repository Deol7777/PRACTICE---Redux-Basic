import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";

const cartSlice = createSlice({
  name: "cart",
  initialState: { itemList: [] },
  reducers: {
    addItem(state, action) {
      console.log("ID received in the reducer: " + action.payload);
      //if the itemis already found
      const item = state.itemList.find((x) => x.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.itemList.push({
          id: action.payload.id,
          title: action.payload.title,
          quantity: 1,
          price: action.payload.price,
        });
      }

      //state.itemList.push(tempCartItem);
    },
    increaseCartAmount(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      item.quantity++;
    },

    decreaseCartAmount(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      if (item.quantity === 1) {
        const index = state.itemList.indexOf(item);
        state.itemList.splice(index, 1);
      } else {
        item.quantity--;
      }
    },

    deleteFromCart(state, action) {
      const item = state.itemList.find((x) => x.id === action.payload);
      state.itemList.splice(state.itemList.indexOf(item), 1);
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Pending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-starwars-8c8b8-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      console.log(response);
      if (!response.ok) {
        console.log("EEEEEEEE");
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Data successfully sent",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Problem sending Data",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
