import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllProducts, fetchProducts } from 'redux/slices/products';
import { addProductToCart } from 'redux/slices/cartItems';
import { useEffect } from 'react';

function ProductsList() {
  const products = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.name} {product.price}
            <button
              onClick={() => dispatch(addProductToCart(product.id))}
              style={{ marginLeft: '10px' }}
            >
              Add to Cart
            </button>
            <Link to={`/products/${product.id}`} style={{ marginLeft: '10px' }}>
              Edit
            </Link>
          </div>
        );
      })}
      <Link to={`/products/new`}>Add new Product</Link>
    </div>
  );
}

export default ProductsList;
