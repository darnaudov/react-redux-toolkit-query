import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectCartItemById,
  addProductToCart,
  removeProductFromCart,
} from 'redux/slices/cartItems';
import { useGetProductQuery } from 'redux/slices/productsApi';

interface Props {
  id: number;
}

function CartItem({ id }: Props) {
  const { data: product } = useGetProductQuery(id);
  const cartItem = useAppSelector((state) => selectCartItemById(state, id));
  const dispatch = useAppDispatch();

  if (!product || !cartItem) {
    return null;
  }

  return (
    <div key={id} data-testid="cart-item">
      {product.name} {product.price} x {cartItem.qty}
      <button
        onClick={() => dispatch(removeProductFromCart(id))}
        style={{ marginLeft: '10px' }}
      >
        -
      </button>
      <button
        onClick={() => dispatch(addProductToCart(id))}
        style={{ marginLeft: '5px' }}
      >
        +
      </button>
    </div>
  );
}

export default CartItem;
