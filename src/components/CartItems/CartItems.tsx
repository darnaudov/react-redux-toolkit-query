import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectAllCartItems,
  addProductToCart,
  removeProductFromCart,
} from 'redux/slices/cartItems';
import { selectProductEntities } from 'redux/slices/products';

function CartItems() {
  const cartItems = useAppSelector(selectAllCartItems);
  const products = useAppSelector(selectProductEntities);
  const dispatch = useAppDispatch();

  return (
    <div>
      CartItems
      {cartItems.map((item) => {
        const product = products[item.productId]!;
        return (
          <div>
            {product.name} {product.price} {item.qty}
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
          const product = products[item.productId]!;
          return totalPrice + item.qty * product.price;
        }, 0)}
      </div>
    </div>
  );
}

export default CartItems;
