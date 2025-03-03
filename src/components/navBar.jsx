import React from 'react';
import { BsList } from 'react-icons/bs';
import "./navBar.css";

export const NavBar = () => {
  return (
    <nav className='NavBar'>
       <div><BsList/></div>
       <a style={{padding: "0px 30px 0px 5px" }}>All Categories</a>
       <a style={{padding: "0px 30px 0px 30px" }}>Products</a>
       <a style={{padding: "0px 30px 0px 30px" }}>Blog</a>
       <a style={{padding: "0px 155px 0px 30px" }}>Contact</a>
       <a style={{padding: "0px 30px 0px 155px" }}>LIMITED SALE</a>
       <a style={{padding: "0px 30px 0px 30px" }}>Best Seller</a>
       <a style={{padding: "0px 0px 0px 30px" }}>New Arrival</a>
    </nav>
  )
}
