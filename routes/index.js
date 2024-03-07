import express from 'express';
import categories from './categories.js';
import products from './products.js';

var router = express.Router();

// API endpoint category
router.use('/categories', categories);

// API endpoint product
router.use('/products', products);

export default router;
