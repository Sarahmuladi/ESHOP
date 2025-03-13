/*
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user_id = 1;

  // Fetch cart items from backend on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart_items`, {
          params: { user_id }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, [user_id]);

  // Add product to cart (API request)
  const addToCart = async (product) => {
    try {
      const total_price = product.price * product.quantity;
      const response = await axios.post(`http://localhost:5000/api/cart_items`, {
        user_id: user_id,
        product_id: product.id,
        quantity: product.quantity, // Adjust as needed
        total_price: total_price,
      });

      setCartItems((prevCart) => [...prevCart, response.data]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Remove product from cart (API request)
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart_items/${id}`, {
        params: { user_id }
      });
      setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Update cart item quantity (API request)
  const updateCart = async (id, quantity) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cart_items/${id}`, {
        user_id: user_id,
        quantity,
      });
      setCartItems((prevCart) =>
        prevCart.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
*/
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
              const response = await axios.post("http://localhost:5000/api/cart_items", 
                  { cartItems }, // Send cartItems array
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
