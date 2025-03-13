import React from 'react';
import "./secondBar.css"
import { IoIosSearch } from 'react-icons/io';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const SecondBar = () => {

  const navigate = useNavigate();

  const handleClick = () => {
     navigate('/cart')
  }

  return (
    <div className='secondBar'>
        <div className='eShop'>e-shop</div>

        <div className='searchContainer'>
        <input type='search' name='searchBar' placeholder='Search Products' className='searchBar'/>
        <IoIosSearch className='searchIcon' style={{color: "black"}}/>
        </div>

        <div className='cart'>
        <button type="button" onClick={handleClick} style={{backgroundColor: "red", border: "none"}}>
          <HiOutlineShoppingCart size={35}/>
          </button>
        <div>Cart <br/> <b><div>$0</div></b></div>
        </div>|

        <div className='user'>
        <RiUserLine size={30}/>
        <div>User <br/> <b>Account</b></div>
        </div>
    </div>
  )
}
