import React from 'react'
import "./bannerBar.css";
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { BiRefresh } from 'react-icons/bi';

export const BannerBar = () => {
  return (
    <div className='bannerBar'>
        <div className='element' style={{paddingRight:"30px"}}>
        <div>< TfiHeadphoneAlt size={32}/></div>
        <div style={{paddingLeft: "4px"}}><b>Responsive</b> <br/> Customer Sevice available 24/7</div>
        </div>

        <div className='element' style={{padding: "0px 30px"}}>
        <div><MdOutlineVerifiedUser size={30}/></div>
        <div style={{paddingLeft: "4px"}}><b>Secure</b> <br/> Certified marketplace since 2007</div>
        </div>

        <div className='element' style={{padding: "0px 30px"}}>
        <div><LiaShippingFastSolid size={35}/></div>
        <div style={{paddingLeft: "4px"}}><b>Shipping</b> <br/> Free, fast and reliable worldwide</div>
        </div>

        <div className='element' style={{paddingLeft:"30px"}}>
        <div><BiRefresh size={35}/></div>
        <div style={{paddingLeft: "4px"}}><b>Transparent</b> <br/> Hassle-free return policy</div>
        </div>
    </div>
  )
}
