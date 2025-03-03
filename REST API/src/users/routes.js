import Router from 'express';
import { addUser, removeUser, getUsers, getUserById, updateUser } from '../eshop/controller.js';

const router = Router();

router.post('/users', addUser);
router.delete('/users/:id', removeUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);

export default router;