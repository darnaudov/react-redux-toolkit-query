import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { addProduct } from 'redux/slices/products';

function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>New Product</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="price">Price: </label>
        <input
          id="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        ></input>
      </div>
      <button
        onClick={() => dispatch(addProduct({ name, price }))}
        style={{ marginTop: '10px' }}
      >
        Add Product
      </button>
    </>
  );
}

export default NewProduct;
