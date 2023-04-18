import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui";
import React from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart";

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

    if(appStarted)
    {
      appStarted = false;
      return;
    }
    dispatch(sendCartData(cart));
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
