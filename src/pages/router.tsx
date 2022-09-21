import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  createMemoryRouter,
} from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import * as paths from 'pages/paths';
import MainLayout from './MainLayout';
import Home from 'pages/Home';
import Products from 'pages/Products';
import NewProduct from 'pages/NewProduct';
import Product from 'pages/Product';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import Error from 'pages/Error';

export const routes = createRoutesFromElements(
  <>
    <Route
      path={paths.home()}
      element={<MainLayout />}
      errorElement={<Error />}
    >
      <Route index element={<Home />}></Route>
      <Route path={paths.products()} element={<Products />}></Route>
      <Route path={paths.productsById()} element={<Product />}></Route>
      <Route path={paths.productsNew()} element={<NewProduct />}></Route>
      <Route path={paths.cart()} element={<Cart />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  </>
);

export function setupMemoryRouter({
  routes: customRoutes = routes,
  initialEntries,
  initialIndex,
}: {
  routes?: RouteObject[];
  initialEntries?: string[];
  initialIndex?: number;
}) {
  return createMemoryRouter(customRoutes, {
    initialEntries,
    initialIndex,
  });
}

const router = createBrowserRouter(routes);

export default router;
