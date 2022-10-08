import { useAppDispatch } from 'redux/hooks';
import { Link } from 'react-router-dom';
import {
  addProductToCart,
  clearCart,
  clearProductFromCart,
} from 'redux/slices/cartItems';
import * as paths from 'pages/paths';
import {
  useGetProductQuery,
  useRemoveProductMutation,
} from 'redux/slices/productsApi';

interface Props {
  id: number;
}

function ProductInfo({ id }: Props) {
  const { data: product } = useGetProductQuery(id);
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
          removeProduct(id);
          dispatch(clearProductFromCart(id));
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
