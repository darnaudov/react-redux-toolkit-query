import { rest } from 'msw';
import { serverBaseUrl } from 'api';

const mockProducts = [
  {
    id: 1,
    name: 'MacBook',
    price: 1400,
    seller: {
      id: 1,
      name: 'George',
    },
  },
  {
    id: 2,
    name: 'Old Car',
    price: 2400,
    seller: {
      id: 2,
      name: 'Susan',
    },
  },
  {
    id: 3,
    name: 'W Shoes',
    price: 999,
    seller: {
      id: 1,
      name: 'George',
    },
  },
];

export const handlers = [
  rest.get(`${serverBaseUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts), ctx.delay(200));
  }),
  rest.get(`${serverBaseUrl}/products/1`, (req, res, ctx) => {}),
  rest.post(`${serverBaseUrl}/products`, (req, res, ctx) => {}),
  rest.patch(`${serverBaseUrl}/products/1`, (req, res, ctx) => {}),
  rest.delete(`${serverBaseUrl}/products/1`, (req, res, ctx) => {}),
];
