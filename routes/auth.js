import express from 'express';
import { register, login, refreshToken } from '../controllers/AuthController.js';

var router = express.Router();

// Post data auth user to db
router.post('/register', register); //auth/register

// Post data auth user to db
router.post('/login', login); //auth/login

// Verify refresh token
router.post('/refresh-token', refreshToken); //auth/login

export default router;
