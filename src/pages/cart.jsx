import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { Link } from "react-router-dom";
import "./cart.css";
import axios from "axios";
import config from "./config";

const Cart = () => {
    const { cartItems, removeFromCart, updateCart } = useContext(CartContext);
    const user_id = 1;

    const getTotalPrice = () => {
      if (!cartItems || cartItems.length === 0) return 0; 
      return cartItems.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };


  const sendCartToServer = async () => {
    try {
        const formattedCartItems = cartItems.map(item => ({
            //id: item.cartItemsId,
            user_id: user_id,
            product_id: item.id,
            quantity: item.quantity,
            total_price: item.price * item.quantity,
            
        }));

        const response = await axios.post(`${config.backendUrl}/api/cart_items`, 
            { cartItems: formattedCartItems }, // Send formatted cartItems array
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
  
  

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <img src="/Images/img15.jpg" alt="Empty Cart" 
                    style={{margin: "0px auto", width: "350px", height: "350px"}}
                    />
                    <p><b>Your cart is empty</b></p>
                    <Link to="/" className="explore-button">Explore items</Link>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image_url} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Total Price: ${item.price * item.quantity}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                                <button onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                            </div>

                           



                        </div>



                    ))}


 {/* Total Price Section */}
 <div className="cart-total">
                        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                    </div>


                    <button onClick={sendCartToServer}>Checkout</button>



                </div>

                
            )
            
            
            
            
            
            }
        </div>
    );
};

export default Cart;
