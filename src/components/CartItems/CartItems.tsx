import { useAppSelector } from 'redux/hooks';
import { selectAllCartItems } from 'redux/slices/cartItems';
import { selectProductEntities } from 'redux/slices/products';
import CartItem from 'components/CartItem';

function CartItems() {
  const cartItems = useAppSelector(selectAllCartItems);
  const products = useAppSelector(selectProductEntities);

  return (
    <div>
      CartItems
      {cartItems.map((item) => {
        return <CartItem id={item.productId}></CartItem>;
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
