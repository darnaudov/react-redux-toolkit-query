import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectCartItemById,
  addProductToCart,
  removeProductFromCart,
} from 'redux/slices/cartItems';
import { useGetProductQuery } from 'redux/slices/productsApi';
import { Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

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
      <Button
        onClick={() => dispatch(removeProductFromCart(id))}
        variant="outlined"
        size="small"
        sx={{ marginLeft: '10px' }}
      >
        <Remove></Remove>
      </Button>
      <Button
        onClick={() => dispatch(addProductToCart(id))}
        variant="outlined"
        size="small"
        sx={{ marginLeft: '5px' }}
      >
        <Add></Add>
      </Button>
    </div>
  );
}

export default CartItem;
