import pool from '../../db.js';
import queries from './queries.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// GET /products?page=1&limit=4
const getProducts =  async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 4; // Default limit 4
    const offset = (page - 1) * limit;

    try {
        const products = await pool.query(queries.getProducts , [limit, offset]);

        const total = await pool.query("SELECT COUNT(*) FROM products");

        res.json({
            products: products.rows,
            total: parseInt(total.rows[0].count),
            page,
            totalPages: Math.ceil(total.rows[0].count / limit),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET A SINGLE PRODUCT FROM DATABASE BY ID 
const getProductById = (req, res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getProductById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
    
};

//ADD A NEW USER TO THE DATABASE
const addUser = (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
       return res.status(400).send("All fields are required.");
        
    }

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists.");
            return;
        }

    pool.query(queries.addUser, [name, email, password], (error, results) => {
        if (error) throw error;
        res.status(201).send("User added successfully.");
    });
});
}; 

//REMOVE A USER FROM THE DATABASE
const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeUser, [id], (error, results) => {
        if (error) throw error;

        const noUserFound = !results.rowCount;

        if (noUserFound){
          return res.send("Student does not exist in the database.");
        }

          res.status(200).send("User deleted successfully.");
    
    });
};

//ADD A NEW PRODUCT TO THE DATABASE
const addProduct = (req, res) => {
    const {name, description, image_url, price} = req.body;

    pool.query(queries.checkProductExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Product already exists.");
            return;
        }
    });

    pool.query(queries.addProduct, [name, description, image_url, price], (error, results) => {
        if (error) throw error;
        res.status(201).send("Product added successfully.");
    });
}

//DELETE A PRODUCT FROM THE DATABASE
const removeProduct = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeProduct, [id], (error, results) => {
        if (error) throw error;

        const noProductFound = !results.rowCount;

        if (noProductFound){
          return res.send("Product does not exist in the database.");
        }

          res.status(200).send("Product deleted successfully.");
    
    });
};

// GET ALL USERS FROM DATABASE
const getUsers = (req, res) =>{
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

// GET A SINGLE USER FROM DATABASE BY ID
const getUserById = (req, res) =>{
    const id =parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
    
};

//UPDATE DETAILS OF A USER IN THE DATABASE
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);

    const { name, email, password } = req.body;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email ) {
    return res.status(400).json("name and email are required.");
    }

    //Check if the user exists in the database
      pool.query(queries.getUserById, [id], (error, results) => {
        if (error) {
            return res.status(500).json("Error checking user in database.");
        }

        const userNotFound = !results.rowCount;
        if (userNotFound) {
            return res.status(404).json("User does not exist in the database.");
}
      });    


    // Handle password update logic
    if (oldPassword && newPassword && confirmPassword) {
        if (newPassword !== confirmPassword) {
        return res.status(400).json("Passwords do not match.");
        }

        // Update user with new password
        pool.query(queries.updateUser, [name, email, newPassword, id], (error, results) => {
        if (error) {
        return res.status(500).json("Error updating user.");
        }

        res.status(200).json("User updated successfully.");

        });
    } 

        // Update without changing the password
        pool.query(queries.updateUser, [name, email, password, id], (error, results) => {
            
        if (error) {
        return res.status(500).json("Error updating user.");
        }

        res.status(200).json("User updated successfully.");
        });
    
};

// ADD A PRODUCT TO THE WISHLIST
const addProductToWishlist = (req, res) => {
    const { product_id, user_id } = req.body;

    if (!product_id || !user_id) {
        return res.status(400).json("Product ID and User ID are required.");
    }

    pool.query(queries.checkProductExistsInWishlist, [product_id, user_id], (error, results) => {
        if (error) {
            return res.status(500).json("Error checking product in wishlist.");
        }

        if (results.rows.length) {
            return res.status(400).json("Product already exists in the wishlist.");
        }

        pool.query(queries.addProductToWishlist, [user_id, product_id], (error, results) => {
            if (error) {
                return res.status(500).json("Error adding product to wishlist.");
            }
            res.status(201).json("Product added to wishlist successfully.");
        });
    });
};

//REMOVE A PRODUCT FROM THE WISHLIST
const deleteProductFromWishlist = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.deleteProductFromWishlist, [id], (error, results) => {
    if (error) throw error;

    const noProductFound = !results.rowCount;

    if (noProductFound){
      return res.send("Product does not exist in the wishlist.");
    }

      res.status(200).send("Product deleted successfully.");

});
};

//ADDIND A PRODUCT TO CART
const addProductToCart = (req, res) => {
const { user_id, product_id, quantity, total_price } = req.body;
    
// Validate required fields
if (!user_id || !product_id || !quantity || !total_price) {
 return res.status(400).send("All fields are required.");
}
    
// Check if the product exists in the product table
pool.query(queries.checkProductExistsInProducts, [product_id], (error, results) => {
            if (error) {
                return res.status(500).send("Error checking product in products table.");
            }
    
            const product = results.rows[0];
            if (!product) {
                return res.status(404).send("Product not found.");
            }
    
            // Check if there is enough stock available
            if (product.stock_quantity < quantity) {
                return res.status(400).send("Not enough stock available");
            }
    
            // Check if the product is already in the cart
            pool.query(queries.existingCartItem, [user_id, product_id], (error, results) => {
                if (error) {
                    return res.status(500).send("Error checking cart items.");
                }
    
                if (results.rows.length > 0) {
                    // If product exists in the cart, then update quantity
                    const newQuantity = results.rows[0].quantity + quantity;
                    const total_price = product.price * newQuantity;
    
                    pool.query(queries.updateQuantityInCart, [newQuantity, total_price, user_id, product_id], (error, results) => {
                        if (error) {
                            return res.status(500).send("Error updating cart.");
                        }
                        res.status(200).send("Cart updated successfully.");
                    });
                } else {
                    // If the product is not in the cart, add it
                    const total_price = product.price * quantity;
    
                    pool.query(queries.addProductToCart, [user_id, product_id, quantity, total_price], (error, results) => {
                        if (error) {
                            return res.status(500).send("Error adding product to cart.");
                        }
                        res.status(200).send("Product added to cart successfully.");
                    });
                }
            });
        });
    };

//DELETING A PRODUCT FROM THE CART
const deleteProductFromCart = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.deleteProductFromCart, [id], (error, results) => {
        if (error) throw error;

        const noProductFound = !results.rowCount;

        if (noProductFound){
          return res.send("Product does not exist in the cart.");
        }

          res.status(200).send("Product deleted successfully.");

});
};

//VIEW ALL PRODUCTS IN THE CART
const getCartItems = (req, res) =>{
    const { user_id } = req.params;

    pool.query(queries.getCartItems, [user_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

//CREATING AN ORDER OR CHECKOUT
const createAnOrder = async (req, res) => {
    const { user_id, items } = req.body; // An array of items [{product_id, quantity, price}]

    if (!user_id || !items || items.length === 0) {
        return res.status(400).send("User ID and items are required");
    }

    // Calculate total price
    let total_price = 0;
    items.forEach(item => {
        total_price += item.quantity * item.price;
    });

    try {
        // Insert into orders table
        const orderResult = await pool.query(queries.createAnOrder, [user_id, total_price, 'pending']);
        const order_id = orderResult.rows[0].id;

        // Insert order items
        for (const item of items) {
            await pool.query(queries.addOrderItem, [order_id, item.product_id, item.quantity, item.price]);
        }

        // Clear the cart after order completion
        await pool.query(queries.deleteFromCart, [user_id]);

        res.status(201).json({ message: "Order created successfully", order_id });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Server Error");
    }
};

// READ ALL PRODUCTS FROM ORDERS TABLE
const getOrders = (req, res) =>{
    pool.query(queries.getOrders, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

//READ SINGLE ORDER WITH ITEMS
const getOrderWithItems = (req, res) => {
    const order_id = req.params.order_id;
    pool.query(queries.getOrderWithItems, [order_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        });
}

//UPDATE ORDER STATUS
const updateOrderStatus = (req, res) => {
    const { order_id, status } = req.body;

    if (!order_id || !status) {
        return res.status(400).send("Order ID and status are required.");
    }

    pool.query(queries.updateOrderStatus, [status, order_id], (error, results) => {
        if (error) {
            return res.status(500).send("Error updating order status.");
        }

        if (results.rowCount === 0) {
            return res.status(404).send("Order not found.");
        }

        res.status(200).send("Order status updated successfully.");
    });
};

//DELETE AN ORDER
const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).send("Order ID is required.");
    }

    // Delete order items first
    pool.query(queries.deleteOrderItems, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Error deleting order items.");
        }

        // Then delete the order
        pool.query(queries.deleteOrder, [id], (error, results) => {
            if (error) {
                return res.status(500).send("Error deleting order.");
            }

            if (results.rowCount === 0) {
                return res.status(404).send("Order not found.");
            }

            res.status(200).send("Order and associated items deleted successfully.");
        });
    });
};


//CREATE AN ORDER ITEM
const addOrderItem = (order_id, items, res) => {
    items.forEach(item => {
        pool.query(queries.addOrderItem, [order_id, item.product_id, item.quantity, item.price], (error, results) => {
            if (error) {
                return res.status(500).send("Error adding order item.");
            }
        });
    });
};

//READ ALL ORDER ITEMS
const getOrderItems = (req, res) => {
    pool.query(queries.getOrderItems, (error, results) => {
        if (error) {
            return res.status(500).send("Error retrieving order items.");
        }
        res.status(200).json(results.rows);
    });
};

//READ ORDER ITEMS BY ORDER ID
const getOrderItemsByOrderId = (req, res) => {
    const order_id = parseInt(req.params.id);

    if (!order_id) {
        return res.status(400).send("Order ID is required.");
    }

    pool.query(queries.getOrderItemsByOrderId, [order_id], (error, results) => {
        if (error) {
            return res.status(500).send("Error retrieving order items.");
        }
        res.status(200).json(results.rows);
    });
};

//READ SINGLE ORDER ITEM BY ID
const getOrderItemById = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).send("Order item ID is required.");
    }

    pool.query(queries.getOrderItemById, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Error retrieving order item.");
        }
        if (results.rows.length === 0) {
            return res.status(404).send("Order item not found.");
        }
        res.status(200).json(results.rows[0]);
    });
};

//UPDATE ORDER ITEM
const updateOrderItem = (req, res) => {
    const id = parseInt(req.params.id);
    const { quantity, price } = req.body;

    if (!id || !quantity || !price) {
        return res.status(400).send("Order item ID, quantity, and price are required.");
    }

    pool.query(queries.updateOrderItem, [quantity, price, id], (error, results) => {
        if (error) {
            return res.status(500).send("Error updating order item.");
        }
        if (results.rowCount === 0) {
            return res.status(404).send("Order item not found.");
        }
        res.status(200).send("Order item updated successfully.");
    });
};

//DELETE AN ORDER ITEM
const deleteOrderItem = (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).send("Order item ID is required.");
    }

    pool.query(queries.deleteOrderItem, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Error deleting order item.");
        }
        if (results.rowCount === 0) {
            return res.status(404).send("Order item not found.");
        }
        res.status(200).send("Order item deleted successfully.");
    });
};

//REGISTERING A USER
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //check if the email is already in use
        const emailCheck = await pool.query(queries.emailCheck, [email]);
            
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        //Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            queries.registerUser,
            [name, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

//LOGIN AS A REGISTERED USER
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    //validate the fields
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const results = await pool.query(queries.userLogin, [email]);
        
        if (results.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = results.rows[0];

        //compare the password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }
 
        // Generate JWT tokens
        const jwtSecret = process.env.JWT_SECRET;
        
        if (!jwtSecret) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ error: "Server configuration error" });
        }
        
        const userPayload = { 
            id: user.id,
            email: user.email,
            name: user.name
        };

        const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
        
        //sending one response with all the data
        res.status(200).json({ 
            message: "Login successful",
            user: userPayload, 
            accessToken, 
            refreshToken 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is required" });
    }

    try {
        const userPayload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
            { id: userPayload.id, email: userPayload.email, name: userPayload.name }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: "Invalid refresh token" });
    }
};

// Logout
const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
    }

    try {
        await pool.query(queries.logout, [refreshToken]);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export {
    getProducts,
    getProductById,
    addUser,
    removeUser,
    addProduct,
    removeProduct,
    getUsers,
    getUserById,
    updateUser,
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
    updateOrderItem,
    deleteOrderItem,
    userLogin,
    registerUser,
    logout,
    refreshAccessToken
};