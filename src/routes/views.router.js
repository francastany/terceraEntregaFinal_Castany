import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
const router = Router();

router.get('/register', viewsController.register);
router.get('/', viewsController.login);
router.get('/logout', viewsController.logout);

export default router;