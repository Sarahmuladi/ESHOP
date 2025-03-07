import React from 'react'
import { FirstBar } from '../components/firstBar';
import { SecondBar } from '../components/secondBar';
import { Banner } from '../components/banner';
import { BannerBar } from '../components/bannerBar';
import { Products } from '../components/products';

const Home = () => {
  return (
    <>
    <div className='body' style={{border: "1px solid #ccc", zIndex: "2"}}>
    <FirstBar/>

    <SecondBar/>

    <Banner/>

    <BannerBar/>

    <Products/>
    
    </div>
    </>
  )
}

export default Home;