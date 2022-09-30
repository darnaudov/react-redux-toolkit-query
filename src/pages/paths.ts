type idType = number | ':id';

export function home() {
  return '/';
}

export function login() {
  return '/login';
}

export function signUp() {
  return '/signup';
}

export function products() {
  return '/products';
}

export function productsById(id: idType = ':id') {
  return `${products()}/${id}`;
}

export function productsNew() {
  return `${products()}/new`;
}

export function cart() {
  return '/cart';
}
