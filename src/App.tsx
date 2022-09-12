import './App.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import Header from 'components/Header';
import Products from 'components/Products';
import CartItems from 'components/CartItems';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <Products></Products>
        <CartItems></CartItems>
      </div>
    </Provider>
  );
}

export default App;
