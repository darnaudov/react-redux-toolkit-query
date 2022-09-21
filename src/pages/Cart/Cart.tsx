import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllCartItems, clearCart } from 'redux/slices/cartItems';
import { selectProductEntities } from 'redux/slices/products';
import CartItem from 'components/CartItem';

function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectAllCartItems);
  const products = useAppSelector(selectProductEntities);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      const product = products[item.productId]!;
      return total + item.qty * product.price;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItems, products]);

  return (
    <>
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => {
          return <CartItem id={item.productId} key={item.productId}></CartItem>;
        })}
        <div style={{ marginTop: '5px' }}>Total Price: ${totalPrice}</div>
        <button
          onClick={() => {
            dispatch(clearCart());
          }}
          style={{ marginTop: '10px' }}
        >
          Clear Cart
        </button>
      </div>
    </>
  );
}

export default Cart;
