import Router from 'express';
import { registerUser } from '../eshop/controller.js';

const router = Router();

router.post('/register', registerUser);


export default router;