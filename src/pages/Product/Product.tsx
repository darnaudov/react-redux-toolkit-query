import { useEffect, useState } from 'react';
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

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  return (
    <>
      <h1>Product {id}</h1>
      <div>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ marginLeft: '5px' }}
        ></input>
      </div>

      <div>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
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
        Update
      </button>
    </>
  );
}

export default Product;
