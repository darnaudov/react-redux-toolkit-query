import { schema } from 'normalizr';

export const sellerEntity = new schema.Entity('seller');
export const productEntity = new schema.Entity('products', {
  seller: sellerEntity,
});
export const cartItemEntity = new schema.Entity('cartItems');
