import { useEffect, useRef, useState } from 'react'

function App() {
  const [window_count, setCount] = useState(1)
  const[shopping_count,setshopcount]=useState(0);
  const[price_arr,setPriceList]=useState([])
  const product_positon= useRef(0);
 const scrollToLeft =()=>{
  if (product_positon.current) {
    product_positon.current.scrollLeft += 80; // Adjust as needed
  }
 }
 const scrollToRight =()=>{
  if (product_positon.current) {
    product_positon.current.scrollLeft -= 80; // Adjust as needed
  }
 }

const getdata= ()=>{
  fetch('public/price.json',{headers:{
'Content-type':'application/json',
'Accept':'appliaction/json'
  }}).then((value)=>{
    return value.json()
  }).then((data)=>{
    setPriceList(data)
  })
}


  
  useEffect(()=>{
    getdata()
  },[])
// console.log(price_arr[0].product.name)
  return (
    <>
      <div className="main">
        <div className="login-div"></div>
        <div className={(window_count===1)? "sub-main" : "blank"}>
          <div className="cover-bg">
          <div className="sub-cover-bg">
            <div className="navbar">
              <div className="nav-logo"></div>
              <div className="button-function">
                <button className="shop-btn" onClick={()=>setCount(2)}></button>
                <div className="user-info">
                  <div className="userlogo"></div>
                  <button className="login-btn" onClick={()=>setCount(0)}>Sign out</button>
                </div>
              </div>
            </div>
            <div className="design-content">
              <span className="text-design"><p>REDUCE </p></span>
              <span className="text-design s">RECYCLE</span>
              <span className="text-design l">REUSE</span>
             <button className="lower-shop-btn" onClick={()=>setCount(0)}>Shop Now</button>
            </div>
          </div>
          </div>
          <div className="second-page">
          <div className="heading-text">OUR PRODUCTS</div>
          <div className="quote-text">"Recycle for a greener tomorrow, today"</div>
          <div className="products-div" ref={product_positon}>
           
           {
              Object.values(price_arr).map((new_data)=>(
                Object.values(new_data).map((final)=>(
                  Object.values(new_data).map((price,index)=>(
                <div key= {index} className="product-items-card">
                  <div className="img-container">
                  <img src={final.image} alt="" /> </div>
                  <div className="product-details-div">
                    <div className="name-price-details-div">
                      <div className="product-name">{final.name}</div>
                      <div className="product-price">{price.i} INR</div>
                    </div>
                    <button className="Add-to-cart-btn">ADD</button>
                  </div>
                </div>
              ))))))
              // console.log(price_arr[0].product.image)
           }
        
          </div>
          <div className="next-prev-btns">
            <button className='scroll-btn' onClick={scrollToRight}>Prev</button>
           <button className='scroll-btn' onClick={scrollToLeft}>Next</button>
           </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
