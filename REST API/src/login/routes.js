import Router from 'express';
import { userLogin, refreshAccessToken } from '../eshop/controller.js';

const router = Router();

router.post('/login', userLogin);
router.post('/refresh', refreshAccessToken);


export default router;