import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Link } from 'react-router-dom';
import { selectProductById, removeProduct } from 'redux/slices/products';
import { addProductToCart } from 'redux/slices/cartItems';

interface Props {
  id: number;
}

function ProductInfo({ id }: Props) {
  const product = useAppSelector((state) => selectProductById(state, id));
  const dispatch = useAppDispatch();

  if (!product) {
    return null;
  }

  return (
    <div key={product.id}>
      {product.name} {product.price}
      <button
        onClick={() => dispatch(addProductToCart(product.id))}
        style={{ marginLeft: '10px' }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => dispatch(removeProduct(product.id))}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </button>
      <Link to={`/products/${product.id}`} style={{ marginLeft: '10px' }}>
        Edit
      </Link>
    </div>
  );
}

export default ProductInfo;
