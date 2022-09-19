import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllProducts, fetchProducts } from 'redux/slices/products';
import { useEffect } from 'react';
import ProductInfo from 'components/ProductInfo';
import * as paths from 'pages/paths';

function Products() {
  const products = useAppSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Products</h1>
      <div>
        {products.map((product) => {
          return <ProductInfo id={product.id} key={product.id}></ProductInfo>;
        })}
        <Link
          to={paths.productsNew()}
          style={{ marginTop: '10px', display: 'block' }}
        >
          Add new Product
        </Link>
      </div>
    </>
  );
}

export default Products;
