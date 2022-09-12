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
          <div>
            {product.name} {product.price}
            <button
              onClick={() => dispatch(addProductToCart({ ...product, qty: 0 }))}
            >
              Add
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
