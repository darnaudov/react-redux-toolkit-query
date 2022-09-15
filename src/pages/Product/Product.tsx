import { useParams } from 'react-router-dom';

function Product() {
  const params = useParams();
  return <h1>Product {params.id}</h1>;
}

export default Product;
