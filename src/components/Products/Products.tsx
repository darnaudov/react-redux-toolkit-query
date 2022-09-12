import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllProducts } from 'redux/slices/products';
import { addProductToCart } from 'redux/slices/cartItems';

function Products() {
  const products = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  return (
    <div>
      Products
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