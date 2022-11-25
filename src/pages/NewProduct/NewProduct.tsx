import { useState } from 'react';
import { useAddProductMutation } from 'redux/slices/productsApi';
import { Button } from '@mui/material';

function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [addProduct] = useAddProductMutation();

  return (
    <>
      <h1>New Product</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        onClick={() => addProduct({ name, price })}
        style={{ marginTop: '10px' }}
      >
        Add Product
      </Button>
    </>
  );
}

export default NewProduct;
