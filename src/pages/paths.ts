type idType = number | ':id';

export function home() {
  return '/';
}

export function signUp() {
  return '/signup';
}

export function logIn() {
  return '/login';
}

export function resetPassword() {
  return '/reset-password';
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

export function profile() {
  return '/profile';
}

export function updateProfile() {
  return '/update-profile';
}
