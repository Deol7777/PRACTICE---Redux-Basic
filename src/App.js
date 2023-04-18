import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui";
import React from "react";
import Notification from "./components/UI/Notification";

let appStarted = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => {
    return state.ui.showCart;
  });

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  console.log(cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Pending",
          message: "Sending Cart Data",
        })
      );
      const response = await fetch(
        "https://react-starwars-8c8b8-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      console.log(response);
      if (!(response.ok)) {
        console.log("EEEEEEEE");
        throw new Error("Sending cart data failed");

      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Data successfully sent",
        })
      );
    };
    if(appStarted)
    {
      appStarted = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Problem sending Data",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
