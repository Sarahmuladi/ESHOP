import React, { useState, useEffect, useContext } from 'react';
import "./products.css";
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
import axios from 'axios';
import dotenv from 'dotenv';
//dotenv.config();
import { CartContext } from '../context/cartContext';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const {addProductToCart} = useContext(CartContext);

    const handleAddToCart = (product) => {
        // const productData = {
        //     id: product.id,
        //     name: product.name,
        //     description: product.description,
        //     price: product.price,
        //     image: product.image_url,
        //     quantity: 1, 
        // };
        // console.log(productData)
        // Ensure the product details are correct
        console.log('Adding to cart:', product);

        addProductToCart(product);
    };

    const fetchProducts = async (pageNumber) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products`, {
                params: { page: pageNumber, limit: 4 }
            });

            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    return (
        <>

        <div style={{padding: "20px 0px 5px 100px"}}><h3>Featured Products</h3></div>

            <div className='products'>
                <div className='slider'>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <div className='image'>
                                    <img 
                                        src={product.image_url}
                                        alt={product.name} 
                                        style={{ height: "250px", width: "200px" }} 
                                    />
                                    
                                    <p><b>{product.name}</b></p>
                                    <p>{product.description}</p>
                                    <p>
                                        <b style={{ color: "#333" }}>${product.price}</b>
                                        {product.originalPrice && (
                                            <span style={{ textDecoration: "line-through" }}>
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </p>
                                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Pagination control */}
                <div>
                    <button 
                        disabled={page === 1} 
                        className='backbtn' 
                        onClick={() => setPage(page - 1)}
                    >
                        <MdNavigateBefore size={25} />
                    </button>
                    
                    <button 
                        disabled={page === totalPages} 
                        className='nextbtn' 
                        onClick={() => setPage(page + 1)}
                    >
                        <MdNavigateNext size={25} />
                    </button>
                </div>
            </div>
        </>
    );
};
