import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from 'pages/Home';
import Products from 'pages/Products';
import NewProduct from 'pages/NewProduct';
import Product from 'pages/Product';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import Error from 'pages/Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />} errorElement={<Error />}>
        <Route index element={<Home />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="products/:id" element={<Product />}></Route>
        <Route path="products/new" element={<NewProduct />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </>
  )
);

export default router;
