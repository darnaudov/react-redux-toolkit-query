import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectAllProducts,
  selectProductsLoading,
  fetchProducts,
} from 'redux/slices/products';
import { addProductToCart } from 'redux/slices/cartItems';
import { useEffect } from 'react';

function Products() {
  const products = useAppSelector(selectAllProducts);
  const productsLoading = useAppSelector(selectProductsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      Products
      {`Products state ${productsLoading}`}
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.name} {product.price}
            <button onClick={() => dispatch(addProductToCart(product.id))}>
              Add
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
