import { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { selectAllCartItems } from 'redux/slices/cartItems';
import * as paths from 'pages/paths';

function Header() {
  const cartItems = useAppSelector(selectAllCartItems);
  const [totalCartItems, setTotalCartItems] = useState(0);
  useEffect(() => {
    const total = cartItems.reduce((total, item) => {
      return total + item.qty;
    }, 0);
    setTotalCartItems(total);
  }, [cartItems]);

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div>
        <Link href={paths.home()}>Home</Link>
      </div>
      <div>
        <Link href={paths.products()}>Products</Link>
      </div>
      <div>
        <Link href={paths.cart()}>Cart ({totalCartItems})</Link>
      </div>
      <div>
        <Link href={paths.profile()}>Profile</Link>
      </div>
    </nav>
  );
}

export default Header;
