import { SortService } from "../../server/api/v1/services/sort.service";
import { ProductService } from "../../server/api/v1/services/product.service";

describe("Testing Product Sort Functions", () => {
  const prod1 = {"name":"Test Product A","price":99.99,"quantity":0.0};
  const prod2 = {"name":"Test Product B","price":101.99,"quantity":0.0};
  const prod3 = {"name":"Test Product C","price":10.99,"quantity":0.0};
  const prod4 = {"name":"Test Product D","price":5.0,"quantity":0.0};
  const prod5 = {"name":"Test Product F","price":999999999999.0,"quantity":0.0};

  const cust1_prod1 = {"name":"Test Product A","price":99.99,"quantity":3.0};
  const cust1_prod2 = {"name":"Test Product B","price":101.99,"quantity":1.0};
  const cust1_prod3 = {"name":"Test Product F","price":999999999999.0,"quantity":1.0};

  const cust2_prod1 = {"name":"Test Product A","price":99.99,"quantity":2.0};
  const cust2_prod2 = {"name":"Test Product B","price":101.99,"quantity":3.0};
  const cust2_prod3 = {"name":"Test Product F","price":999999999999.0,"quantity":1.0};

  const cust3_prod1 = {"name":"Test Product C","price":10.99,"quantity":2.0};
  const cust3_prod2 = {"name":"Test Product F","price":999999999999.0,"quantity":2.0};

  const cust4_prod1 = {"name":"Test Product A","price":99.99,"quantity":1.0};
  const cust4_prod2 = {"name":"Test Product B","price":101.99,"quantity":1.0};
  const cust4_prod3 = {"name":"Test Product C","price":10.99,"quantity":1.0};

  const customer1 = {"customerId":123,"products":[cust1_prod1, cust1_prod2, cust1_prod3] };
  const customer2 = {"customerId":23,"products":[cust2_prod1, cust2_prod2, cust2_prod3] };
  const customer3 = {"customerId":23,"products":[cust3_prod1, cust3_prod2] };
  const customer4 = {"customerId":23,"products":[cust4_prod1, cust4_prod2, cust4_prod3] };

  const lowResult = [prod4, prod3, prod1,prod2, prod5];
  const highResult = [prod5, prod2, prod1,prod3, prod4];
  const ascendingResult = [prod1, prod2, prod3,prod4, prod5];
  const recommendedResult = [prod1, prod2, prod5,prod3, prod4];

  const unexpectedResult = [prod1, prod2, prod3,prod4, prod5];

  const products =[ prod1, prod2, prod3, prod4, prod5 ];
  const customers =[ customer1,customer2, customer3, customer4 ];

   it("should return products sorted by low price", async() => {
     const sortService = new SortService();
     const option = 'low';

     let low = products.sort(sortService.dynamicSort(option))
     expect(low).not.toEqual(unexpectedResult);
     expect(low).toEqual(lowResult);
   });

   it("should return products sorted by high price", async() => {
     const sortService = new SortService();
     const option = 'high';

     let low = products.sort(sortService.dynamicSort(option))
     expect(low).toEqual(highResult);
   });

   it("should return products sorted by title in ascending order", async() => {
     const sortService = new SortService();
     const option = 'ascending';

     let low = products.sort(sortService.dynamicSort(option))
     expect(low).toEqual(ascendingResult);
   });

   it("should return products sorted by shopping history(recommended)", async() => {
       const sortService = new SortService();
       const productService = new ProductService();
       let productsArray = await sortService.getPopularProducts(customers, products);
       expect(productsArray).toContainEqual(
             expect.objectContaining({ recommended: expect.anything() })
           )
       const option = 'recommended';
       const recommended = productsArray.sort(sortService.dynamicSort(option))
       const recommendedProducts = productService.delete_unwanted_fields(productsArray)
       expect(recommendedProducts).toEqual(recommendedResult);
   });
});