import api from './api.service';
export class ProductService {
  all() {
    return api.products();
  }
  get_customer_data() {
    return api.customer_products();
  }
  delete_unwanted_fields(products){
    products.forEach(function(v){ delete v.recommended });
    return products;
  }
}

export default new ProductService();
