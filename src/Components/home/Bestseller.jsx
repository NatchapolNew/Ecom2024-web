import React,{useEffect,useState} from 'react'
import { listProductBy } from '../../Api/Product'
import ProductCard from '../Card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'


const Bestseller = () => {
  const [data,setData] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = ()=>{
    listProductBy('sold','desc',6)
    .then((res)=>
        setData(res.data)
    )
    .catch((err)=>console.log(err))
  }

  return (
    
    <SwiperShowProduct>
        {
            data?.map((item,index)=>
              <SwiperSlide key={index}>
                <ProductCard item={item} key={index}/>
              </SwiperSlide>
            
            )
        }


    </SwiperShowProduct>
  )
}

export default Bestseller