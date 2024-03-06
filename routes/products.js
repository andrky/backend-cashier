import express from 'express';
import { index, store } from '../controllers/ProductController.js';

var router = express.Router();

// Get data products from db
router.get('/', index);

// Post data products to db
router.post('/', store);

export default router;
