import React from 'react'
import { FirstBar } from '../components/firstBar';
import { SecondBar } from '../components/secondBar';
import { NavBar } from '../components/navBar';
import { Banner } from '../components/banner';
import { BannerBar } from '../components/bannerBar';
import { Products } from '../components/products';

const Home = () => {
  return (
    <>
    <div className='body' style={{border: "1px solid #ccc", zIndex: "2"}}>
    <FirstBar/>
    <hr/>

    <SecondBar/>

    <NavBar/>

    <Banner/>

    <BannerBar/>

    <div style={{padding: "20px 0px 20px 100px"}}><h3>Featured Products</h3></div>

    <Products/>
    
    </div>
    </>
  )
}

export default Home;