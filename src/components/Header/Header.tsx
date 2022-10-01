import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={paths.home()}>Home</Link>
      </div>
      <div>
        <Link to={paths.products()}>Products</Link>
      </div>
      <div>
        <Link to={paths.cart()}>Cart ({totalCartItems})</Link>
      </div>
      <div>
        <Link to={paths.profile()}>Profile</Link>
      </div>
    </nav>
  );
}

export default Header;
