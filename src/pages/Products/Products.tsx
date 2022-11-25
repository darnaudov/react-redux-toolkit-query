import { Link } from '@mui/material';
import ProductInfo from 'components/ProductInfo';
import * as paths from 'pages/paths';
import { useGetProductsQuery } from 'redux/slices/productsApi';

function Products() {
  const { data: products } = useGetProductsQuery();

  return (
    <>
      <h1>Products</h1>
      <div>
        {products &&
          products.entities &&
          Object.values(products?.entities).map((product) => {
            return product ? (
              <ProductInfo product={product} key={product.id}></ProductInfo>
            ) : null;
          })}
        <Link
          href={paths.productsNew()}
          style={{ marginTop: '10px', display: 'block' }}
        >
          Add new Product
        </Link>
      </div>
    </>
  );
}

export default Products;
