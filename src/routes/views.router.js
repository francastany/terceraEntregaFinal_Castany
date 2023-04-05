import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/', (req, res) => {
    const token = req.cookies[config.jwt.cookie];
    token ? res.render('products') : res.render('login');
});

export default router;