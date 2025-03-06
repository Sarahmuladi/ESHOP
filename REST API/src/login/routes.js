import Router from 'express';
import { userLogin } from '../eshop/controller.js';

const router = Router();

router.post('/login', userLogin);


export default router;