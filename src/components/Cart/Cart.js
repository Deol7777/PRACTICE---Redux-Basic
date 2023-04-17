import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector, useEffect } from 'react-redux';
const Cart = (props) => {

  var cartTotal2 = 0;

  const cartItemsList = useSelector((state)=>
  {
    return state.cart.itemList;
  })

  const cartTotal = useSelector((state) => {
    return state.cart.cartTotal;
  });


  for( const item of cartItemsList)
  {
    cartTotal2 += (Number)(item.quantity * item.price);
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItemsList.map((items) => (
          <CartItem
            key={items.id}
            item={{
              id: items.id,
              title: items.title,
              quantity: items.quantity,
              total: 34,
              price: items.price,
            }}
          />
        ))}
      </ul>
      <p>Total Price: {cartTotal2.toFixed(2)}</p>
    </Card>
  );
};

export default Cart;
