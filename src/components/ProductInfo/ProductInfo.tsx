import { useAppDispatch } from 'redux/hooks';
import { Button } from '@mui/material';
import { addProductToCart, clearProductFromCart } from 'redux/slices/cartItems';
import * as paths from 'pages/paths';
import { useRemoveProductMutation, Product } from 'redux/slices/productsApi';

interface Props {
  product: Product;
}

function ProductInfo({ product }: Props) {
  const [removeProduct] = useRemoveProductMutation();
  const dispatch = useAppDispatch();

  if (!product) {
    return null;
  }

  return (
    <div key={product.id} data-testid="product">
      {product.name} {product.price}
      <Button
        variant="outlined"
        size="small"
        onClick={() => dispatch(addProductToCart(product.id))}
        style={{ marginLeft: '10px' }}
      >
        Add to Cart
      </Button>
      <Button
        variant="outlined"
        size="small"
        href={paths.productsById(product.id)}
        style={{ marginLeft: '10px' }}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => {
          removeProduct(product.id);
          dispatch(clearProductFromCart(product.id));
        }}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </Button>
    </div>
  );
}

export default ProductInfo;
