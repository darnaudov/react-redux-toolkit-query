import { Link } from 'react-router-dom';
import ProductInfo from 'components/ProductInfo';
import * as paths from 'pages/paths';
import { useGetProductsQuery } from 'redux/slices/productsApi';

function Products() {
  const { data: products } = useGetProductsQuery();

  return (
    <>
      <h1>Products</h1>
      <div>
        {products?.ids?.map((productId) => {
          return <ProductInfo id={+productId} key={productId}></ProductInfo>;
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
