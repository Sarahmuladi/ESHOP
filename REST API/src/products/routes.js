import Router from 'express';
import { 
getProductById, 
getProducts, 
addProduct, 
removeProduct, 
addProductToWishlist, 
deleteProductFromWishlist,
addProductToCart,
getCartItems,
deleteProductFromCart,
createAnOrder,
getOrders,
getOrderWithItems,
updateOrderStatus,
deleteOrder,
addOrderItem,
getOrderItems,
getOrderItemsByOrderId,
getOrderItemById,
deleteOrderItem,
updateOrderItem,

} from '../eshop/controller.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', addProduct);
router.delete('/products/:id', removeProduct);
router.post('/wish_list', addProductToWishlist);
router.delete('/wish_list/:id', deleteProductFromWishlist);
router.post('/cart_items', addProductToCart);
router.get('/cart_items', getCartItems);
router.delete('/cart_items/:id', deleteProductFromCart);
router.post('/orders', createAnOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderWithItems);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);
router.post('/order_items', addOrderItem);
router.get('/order_items', getOrderItems);
router.get('/order_items/:id', getOrderItemsByOrderId);
router.get('/order_items/:id', getOrderItemById);
router.put('/order_items/:id', updateOrderItem);
router.delete('/order_items/:id', deleteOrderItem);

export default router;