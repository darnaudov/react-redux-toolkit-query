import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectCartItemById,
  addProductToCart,
  removeProductFromCart,
} from 'redux/slices/cartItems';
import { selectProductById } from 'redux/slices/products';

interface Props {
  id: number;
}

function CartItem({ id }: Props) {
  const product = useAppSelector((state) => selectProductById(state, id));
  const cartItem = useAppSelector((state) => selectCartItemById(state, id));
  const dispatch = useAppDispatch();

  if (!product || !cartItem) {
    return null;
  }

  return (
    <div key={id} data-testid="cart-item">
      {product.name} {product.price} {cartItem.qty}
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
