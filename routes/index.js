import express from 'express';
import categories from './categories.js';
import products from './categories.js';

var router = express.Router();

router.use('/categories', categories);

router.use('/products', products);

export default router;
