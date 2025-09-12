import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  return (
    <button className={classes.button} onClick={() => dispatch(uiActions.toggleCart())}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
