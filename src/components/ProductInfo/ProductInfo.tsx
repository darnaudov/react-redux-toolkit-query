import { useAppDispatch } from 'redux/hooks';
import { Link } from 'react-router-dom';
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
      <button
        onClick={() => dispatch(addProductToCart(product.id))}
        style={{ marginLeft: '10px' }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          removeProduct(product.id);
          dispatch(clearProductFromCart(product.id));
        }}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </button>
      <Link to={paths.productsById(product.id)} style={{ marginLeft: '10px' }}>
        Edit
      </Link>
    </div>
  );
}

export default ProductInfo;
