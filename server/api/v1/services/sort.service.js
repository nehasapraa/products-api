export class SortService {
  findSortOption(sortOption){
    let option = {};
    switch(sortOption.toLowerCase()) {
      case 'low': {
        option = 'price'
        break;
      }
      case 'high': {
        option = '-price'
        break;
      }
      case 'ascending': {
        option = 'name'
        break;
      }
      case 'decending': {
        option = '-name'
        break;
      }
      case 'recommended': {
        option = '-recommended';
        break;
      }
      default: {
        option = '-recommended'
        break;
      }
    }
    return option;
  }

  dynamicSort(option) {
    let property = this.findSortOption(option);
    var sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  async getProductsArray(customers, productMap) {
    customers.forEach(customer => {
      const customer_products = customer.products
      customer_products.forEach(item => {
        if(productMap.has(item.name)){
          productMap.get(item.name).recommended = item.quantity + productMap.get(item.name).recommended;
        }
      })
    });
    //convert product map to array
    let productArray = Array.from( productMap.values() );

    return productArray;
  }

  async getPopularProducts(customers, products) {
    let productMap = new Map();
    products.forEach(v => {
      v = { ...v, recommended: 0 }
      productMap.set(v.name,v);
    });
    const productsArray = await this.getProductsArray(customers, productMap);
    return productsArray;
  }
}
export default new SortService();