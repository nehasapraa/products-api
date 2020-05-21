import express from 'express';

import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';
import IndexController from './controllers/IndexController';

export default express
  .Router()
  .get('/', IndexController.user)
  .get('/user', UserController.user)
  .get('/products', ProductController.all)
  .get('/shopping', ProductController.shopping_history)
  .get('/sort', ProductController.sort);
