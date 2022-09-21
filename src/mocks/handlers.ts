import { rest } from 'msw';
import { serverBaseUrl } from 'api';
import { mockProducts } from './mockData';

export const handlers = [
  rest.get(`${serverBaseUrl}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts), ctx.delay(200));
  }),
  rest.get(`${serverBaseUrl}/products/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts[0]));
  }),
  rest.post(`${serverBaseUrl}/products`, async (req, res, ctx) => {
    const { name, price } = await req.json();
    return res(
      ctx.status(200),
      ctx.json({
        name,
        price,
        id: 4,
      })
    );
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
    return res(ctx.status(200));
  }),
];
