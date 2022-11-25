import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from 'redux/slices/productsApi';

type PageParams = {
  id: string;
};

function Product() {
  const params = useParams<PageParams>() as PageParams;
  const id = parseInt(params.id);
  const { data: product } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const areInitialValuesSet = useRef(false);

  useEffect(() => {
    if (product && !areInitialValuesSet.current) {
      setName(product.name);
      setPrice(product.price);
      areInitialValuesSet.current = true;
    }
  }, [product]);

  return (
    <>
      <h1>Product {id}</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ marginLeft: '5px' }}
        ></input>
      </div>

      <div>
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => {
            const price = parseInt(e.target.value);
            setPrice(Number.isNaN(price) ? 0 : price);
          }}
          style={{ marginLeft: '5px' }}
        ></input>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          updateProduct({ id, name, price });
        }}
        style={{ marginTop: '10px' }}
      >
        Update product
      </Button>
    </>
  );
}

export default Product;
