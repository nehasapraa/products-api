import ProductService from '../services/product.service';
import SortService from '../services/sort.service';

export class ProductController {
  all(req, res) {
    ProductService.all()
    .then(r => res.json(r.data))
    .catch(e => {
      res.send(`Status ${e.response.status} ${e.response.data}`)
    });
  }
  shopping_history(req, res) {
    ProductService.get_customer_data()
    .then(r => res.json(r.data))
    .catch(e => {
          res.send(`Status ${e.response.status} ${e.response.data}`)
    });
  }
  sort(req, res) {
    ProductService.get_customer_data()
    .then(async response => {
      const customers = response.data;
      ProductService.all()
      .then(async r => {
        let products =
          (req.query.sortOption.toLowerCase() === 'recommended')
            ? await SortService.getPopularProducts(customers, r.data)
            : r.data;
        products.sort(SortService.dynamicSort(req.query.sortOption));
        products = await ProductService.delete_unwanted_fields(products);
        res.json(products);
      })
      .catch(e => {
            res.send(`Status ${e.response.status} ${e.response.data}`)
      });
    })
    .catch(e => {
          res.send(`Status ${e.response.status} ${e.response.data}`)
    });
  }
}
export default new ProductController();
