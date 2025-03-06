import React from 'react';
import "./secondBar.css"
import { IoIosSearch } from 'react-icons/io';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiUserLine } from 'react-icons/ri';

export const SecondBar = () => {
  return (
    <div className='secondBar'>
        <div className='eShop'>e-shop</div>

        <div className='searchContainer'>
        <input type='search' name='searchBar' placeholder='Search Products' className='searchBar'/>
        <IoIosSearch className='searchIcon' style={{color: "black"}}/>
        </div>

        <div className='cart'>
        <HiOutlineShoppingCart size={35}/>
        <div>Cart <br/> <b><div>$0</div></b></div>
        </div>|

        <div className='user'>
        <RiUserLine size={30}/>
        <div>User <br/> <b>Account</b></div>
        </div>
    </div>
  )
}
