import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectProductById,
  fetchProductById,
  updateProduct,
} from 'redux/slices/products';

type PageParams = {
  id: string;
};

function Product() {
  const params = useParams<PageParams>() as PageParams;
  const id = parseInt(params.id);
  const product = useAppSelector((state) => selectProductById(state, id));
  const dispatch = useAppDispatch();
  const areInitialValuesSet = useRef(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

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
      <button
        onClick={() => {
          dispatch(updateProduct({ id, name, price }));
        }}
        style={{ marginTop: '10px' }}
      >
        Update product
      </button>
    </>
  );
}

export default Product;
