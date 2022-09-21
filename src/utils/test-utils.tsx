import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { setupStore } from 'redux/store';
import type { AppStore, RootState } from 'redux/store';
import { setupMemoryRouter } from 'pages/router';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
  initialEntries?: string[] | null;
  initialIndex?: number | null;
  component?: JSX.Element;
}

export function renderWithStore(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderRoute({
  preloadedState = {},
  store = setupStore(preloadedState),
  route = '/',
  initialEntries = null,
  initialIndex = null,
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  function Wrapper(): JSX.Element {
    const entries = initialEntries !== null ? initialEntries : ['/', route];
    const index = initialIndex !== null ? initialIndex : entries.length;
    const router = setupMemoryRouter({
      initialEntries: entries,
      initialIndex: index,
    });
    return (
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    );
  }
  return {
    store,
    ...render(<Wrapper />, { ...renderOptions }),
  };
}

export function renderComponentAtRoute({
  component,
  preloadedState = {},
  store = setupStore(preloadedState),
  route = '/',
  initialEntries = null,
  initialIndex = null,
  ...renderOptions
}: ExtendedRenderOptions = {}) {
  function Wrapper(): JSX.Element {
    const entries = initialEntries !== null ? initialEntries : ['/', route];
    const index = initialIndex !== null ? initialIndex : entries.length;
    const routes = createRoutesFromElements(
      <Route path={route} element={component}></Route>
    );
    const router = setupMemoryRouter({
      routes,
      initialEntries: entries,
      initialIndex: index,
    });
    return (
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    );
  }
  return {
    store,
    ...render(<Wrapper />, { ...renderOptions }),
  };
}
