import React, { createContext, useState } from "react";
import axios from "axios";

// Create the CartContext
export const CartContext = createContext({
  
  cartItems: [], 
  addToCart: () => {},
  removeFromCart: () => {},
  updateCart: () => {},
});


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addProductToCart = (product) => {
        // Add the product to the cartItems state
        setCartItems((prevItems) => {
            const existingProductIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                // If the item already exists, update the quantity
                const updatedItems = [...prevItems];
                updatedItems[existingProductIndex].quantity += 1;
                return updatedItems;
            } else {
                // Otherwise, add the new product
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });

        // Sending cart to the server
        const sendCartToServer = async () => {
          try {
           
              const response = await axios.post(`${config.backendUrl}/api/cart_items`, 
                  {  cartItems},
                  {
                      headers: {
                          "Content-Type": "application/json"
                      }
                  }
              );
      
              console.log("Cart successfully sent to server:", response.data);
          } catch (error) {
              console.error("Error sending cart to server:", error.response?.data || error.message);
          }
      };
      
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateCart = (productId, quantity) => {
        setCartItems(prevItems => {
            return prevItems.map(item => 
                item.id === productId ? { ...item, quantity } : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addProductToCart, removeFromCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
