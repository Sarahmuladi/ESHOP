const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";
const addUser = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ";
const removeUser = "DELETE FROM users WHERE id = $1";
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addProduct = 
"INSERT INTO products (name, description, image_url, price) VALUES ($1, $2, $3, $4) ";
const checkProductExists = "SELECT s FROM products s WHERE s.name = $1";
const removeProduct = "DELETE FROM products WHERE id = $1";
const updateUser = 
"UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *" ;
const addProductToWishlist = "INSERT INTO wish_list (user_id, product_id) VALUES ($1, $2)";
const deleteProductFromWishlist = "DELETE FROM wish_list WHERE id = $1";
const checkProductExistsInWishlist = "SELECT s FROM wish_list s WHERE s.product_id = $1 AND s.user_id = $2";
const addProductToCart = 
"INSERT INTO cart_items(user_id, product_id, quantity, total_price, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())";
const checkProductExistsInProducts = "SELECT s FROM products s WHERE s.id = $1";
const existingCartItem = "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2";
const updateQuantityInCart = "UPDATE cart_items SET quantity = $1, total_price = $2, updated_at = NOW() WHERE id = $3, user_id = $4 AND product_id = $5";
const deleteProductFromCart = "DELETE FROM cart_items WHERE id = $1";
const getCartItems = "SELECT * FROM cart_items WHERE user_id = $1";
const createAnOrder = "INSERT INTO orders (user_id, total_price, status, created_at) VALUES ($1, $2, $3, NOW() RETURNING id)";
const deleteFromCart = "DELETE FROM cart_items WHERE user_id = $1";
const getOrders = "SELECT * FROM orders WHERE user_id = $1";
const getOrderWithItems = "SELECT * FROM orders WHERE id = $1";
const updateOrderStatus = "UPDATE orders SET status = $1 WHERE id = $2";
const deleteOrder = "DELETE FROM orders WHERE id = $1";
const deleteOrderItems = "DELETE FROM order_items WHERE order_id = $1";
const addOrderItem = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)";
const getOrderItems = "SELECT * FROM order_items";
const getOrderItemsByOrderId = "SELECT * FROM order_items WHERE order_id = $1";
const getOrderItemById = "SELECT * FROM order_items WHERE id = $1";
const updateOrderItem = "UPDATE order_items SET quantity = $1, price = $2 WHERE id = $3";
const deleteOrderItem = "DELETE FROM order_items WHERE id = $1";
const checkEmailAlreadyInUse = "SELECT s FROM users s WHERE s.email = $1";
const registerUser = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
const userLogin = "SELECT * FROM users WHERE email = $1 ";
const emailCheck = "SELECT * FROM users WHERE email = $1";
const logout = "UPDATE users SET refresh_token = NULL WHERE refresh_token = $1";

export default {
    getProducts,
    getProductById,
    checkEmailExists,
    addUser,
    removeUser,
    addProduct,
    checkProductExists,
    removeProduct,
    getUsers,
    getUserById,
    updateUser,
    addProductToWishlist,
    deleteProductFromWishlist,
    checkProductExistsInWishlist,
    addProductToCart,
    checkProductExistsInProducts,
    existingCartItem,
    updateQuantityInCart,
    deleteProductFromCart,
    getCartItems,
    createAnOrder,
    deleteFromCart,
    getOrders,
    getOrderWithItems,
    updateOrderStatus,
    deleteOrder, 
    deleteOrderItems,
    addOrderItem,
    getOrderItems,
    getOrderItemsByOrderId,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem,
    checkEmailAlreadyInUse,
    registerUser,
    userLogin,
    emailCheck,
    logout
};