import './App.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import router from 'pages/router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
