const API_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const getBrands = async () => {
  const response = await fetch(`${API_URL}/brands`);

  if (!response.ok) {
    throw new Error('Failed to fetch brands');
  }

  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};