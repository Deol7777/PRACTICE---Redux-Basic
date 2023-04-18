import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui';
import { useDispatch, useSelector } from 'react-redux';
const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartItemList = useSelector((state)=> state.cart.itemList);

  let totalItems = 0;
  cartItemList.forEach(element => {
    totalItems++;
  });

  const showCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
