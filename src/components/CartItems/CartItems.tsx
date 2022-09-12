import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectAllCartItems,
  addProductToCart,
  removeProductFromCart,
} from 'redux/slices/cartItems';

function CartItems() {
  const cartItems = useAppSelector(selectAllCartItems);
  const dispatch = useAppDispatch();

  return (
    <div>
      CartItems
      {cartItems.map((item) => {
        return (
          <div>
            {item.name} {item.price} {item.qty}
            <button onClick={() => dispatch(removeProductFromCart(item))}>
              -
            </button>
            <button onClick={() => dispatch(addProductToCart(item))}>+</button>
          </div>
        );
      })}
      <div>
        Total Price:{' '}
        {cartItems.reduce((totalPrice, item) => {
          return totalPrice + item.qty * item.price;
        }, 0)}
      </div>
    </div>
  );
}

export default CartItems;
