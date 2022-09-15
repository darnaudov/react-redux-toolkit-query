import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Header;
