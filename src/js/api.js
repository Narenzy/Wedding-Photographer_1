import axios from 'axios';

const BASE_URL = 'https://wedding-photographer.b.goit.study/api';

export async function getFeedbacks() {
  const response = await axios.get(`${BASE_URL}/feedbacks`);
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
}

export async function getWeddingPhotos(params) {
  const response = await axios.get(`${BASE_URL}/wedding-photos`, {
    params,
  });
  return response.data;
}

export async function createOrder(orderData) {
  const response = await axios.post(`${BASE_URL}/orders`, orderData);

  return response.data;
}
