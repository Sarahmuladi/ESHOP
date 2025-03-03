import React from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { FiPhone } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import "./firstBar.css";


export const FirstBar = () => {
  return (
    <>
    <div className='firstBar'>

      <div className='Location'>
      <div><CiLocationOn/></div>
      <div>123 Main Street, Anytown USA</div>
      </div>|

      <div className='Contact'>
      <div><FiPhone/></div>
      <div>-1 (555) 123-4567</div>
      </div>

      <div className='Currency'>
        <select>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="TZS">TZS</option>
        </select>
      </div>|
      
      <div className='Language'>
      <div >
      <img src='/Images/BritishFlag.PNG' style={{height:"19px", width:"20px"}}/>
      </div>
      <div>
      <select>
       <option value="English" >English</option>
       <option value="Swahili">Swahili</option>
      </select>
      </div>
      </div>|

      <div className='Icons'>
      <div className='Icon'><FaFacebookF style={{fontSize:"17px"}}/></div>
      <div className='Icon'><FaTwitter style={{fontSize:"18px"}}/></div>
      <div className='Icon'><FaInstagram style={{fontSize:"18px"}}/></div>
      </div>
    </div>
    </>
  )
}
