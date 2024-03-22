import express from 'express';
import categories from './categories.js';
import products from './products.js';
import auth from './auth.js';

var router = express.Router();

// API endpoint category
router.use('/categories', categories);

// API endpoint product
router.use('/products', products);

// API endpoint auth
router.use('/auth', auth);

export default router;
