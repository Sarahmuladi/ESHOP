import React from 'react'
import "./banner.css"

export const Banner = () => {
  return (
    <div className='banner'>
       <div>
        <div className='heading'>Your One-Stop <br/> Electronic Market</div>
        <div className='message'>Welcome to e-shop, a place where you can buy <br/>
         everything about electronics. Sale every day!</div>
        <button type='button' className='button'>Shop Now</button>
       </div>
       <div className='imageRapper'>
       <div><img src='Images/img1.PNG' /></div>
       <div className='overlay'></div>
       </div>
    </div>
  )
}
