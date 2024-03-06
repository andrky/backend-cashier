import express from 'express';
import { index, store } from '../controllers/CategoryController.js';

var router = express.Router();

// Get data categories from db
router.get('/', index);

// Post data category to db
router.post('/', store);

export default router;
