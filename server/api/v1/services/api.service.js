import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000,
  headers: { Accept: 'application/json' },
});

class ApiService {
  constructor() {
    this.params = {
      params: { token: process.env.API_TOKEN },
    };
  }

  products() {
    const url = '/api/resource/products';
    return Promise.resolve(instance.get(url, this.params));
  }

  customer_products() {
    const url = '/api/resource/shopperHistory';
    return Promise.resolve(instance.get(url, this.params));
  }
}
export default new ApiService();
