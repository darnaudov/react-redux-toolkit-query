import { rest } from 'msw';
import { serverBaseUrl } from 'api';
import { mockProducts } from './mockData';
import { Product } from 'redux/slices/productsApi';

let created: Product[] = [];
let deletedIds: number[] = [];

export function resetMockApi() {
  created = [];
  deletedIds = [];
}

export const handlers = [
  rest.get(`${serverBaseUrl}/products`, (req, res, ctx) => {
    const products = mockProducts
      .concat(created)
      .filter((product) => !deletedIds.includes(product.id));
    return res(ctx.status(200), ctx.json(products), ctx.delay(200));
  }),
  rest.get(`${serverBaseUrl}/products/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts[0]));
  }),
  rest.get(`${serverBaseUrl}/products/2`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts[1]));
  }),
  rest.get(`${serverBaseUrl}/products/3`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts[2]));
  }),
  rest.post(`${serverBaseUrl}/products`, async (req, res, ctx) => {
    const { name, price } = await req.json();
    const newProduct = {
      name,
      price,
      id: 4,
    };
    created.push(newProduct);
    return res(ctx.status(200), ctx.json(newProduct));
  }),
  rest.patch(`${serverBaseUrl}/products/1`, async (req, res, ctx) => {
    const { name, price } = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        ...mockProducts[0],
        name,
        price,
      })
    );
  }),
  rest.delete(`${serverBaseUrl}/products/1`, (req, res, ctx) => {
    deletedIds.push(1);
    return res(ctx.status(200));
  }),
];
