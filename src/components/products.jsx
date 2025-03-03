import React from 'react';
import "./products.css";
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
import { useRef } from 'react';

export const Products = () => {

    const slider = useRef();
    let tx = 0;

    const slideForward = () =>{
      if(tx > -50){
        tx -= 25;
      }
      slider.current.style.transform = 'translateX(${tx}%)'
    }

    const slideBackward = () =>{
        if(tx < 0){
            tx += 25;
          }
          slider.current.style.transform = 'translateX(${tx}%)'
    }

  return (
    <div className='products'>
        <div className = 'backbtn'>
            < MdNavigateBefore size={25} onClick={slideBackward}/></div>

        <div className='nextbtn'>
            <MdNavigateNext size={25} onClick = {slideForward}/></div> 

            <div className='slider'>
        <ul ref={slider}>
            <li>
        <div className='image'>
            <img src='./Images/img2.PNG' style={{height: "250px", width: "200px"}}/>
            <p>PHONE</p>
            <p><b>JPhone 13 High quality <br/> Value Buy Best Camera</b></p>
            <p><b>$999.00</b></p>
        </div>
             </li>

          <li>
        <div className='image'>
        <img src='./Images/img7.PNG' style={{height: "250px", width: "200px"}}/>
        <div>AUDIO</div>
            <p><b>WH-1000XM4 Wireless <br/> Headphones High Quality</b></p>
            <p><b style={{color: "red"}}>$59.00</b><span style={{textDecoration: "line-through"}}>  $110</span></p>
        </div>
        </li>

         <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

         <li>
        <div className='image'>
        <img src='./Images/img3.PNG' style={{height: "250px", width: "200px"}}/>
        <div>CAMERA</div>
            <p><b>Mini Polaroid Camera <br/> for Girls with Flash Light</b></p>
            <p><b>$79.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img5.PNG' style={{height: "250px", width: "250px"}}/>
        <div>TELEVISION</div>
            <p><b>AG OLED65CXPUA 4K <br/> Smart OLED TV New</b></p>
            <p><b>$2,799.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        <li>
        <div className='image'>
        <img src='./Images/img6.PNG' style={{height: "250px", width: "250px"}}/>
        <div>LAPTOP</div>
            <p><b>S21 Laptop Ultra HD LED <br/> 
            Screen Feature 2023...</b></p>
            <p><b>$1,199.00</b></p>
        </div>
        </li>

        </ul>
        
     </div>  
      
        
    </div>
  )
}
