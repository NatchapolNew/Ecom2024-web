import React,{useState,useEffect} from 'react'
import axios from 'axios';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination,Autoplay, Navigation } from 'swiper/modules';



const ContentCarousel = () => {

    const [data,setData] = useState([])

    useEffect(()=>{
        hdlGetImage()
    },[])

    const hdlGetImage = ()=>{
         axios.get('https://picsum.photos/v2/list?page=1&limit=15')
        .then((res)=>setData(res.data))
        .catch((error)=>console.log(error))
    }


  return (
    <div className=''>
        <Swiper 
        pagination={true}
        autoplay={{
            delay:2500,
            disableOnInteraction:false,
        }}
        modules={[Pagination,Autoplay]} 
        className="mySwiper h-80 object-cover rounded-md mb-4">

        {data?.map((item,index)=>
        <SwiperSlide>
            <img src={item.download_url} alt="" />
        </SwiperSlide>
        )}
        
        
      </Swiper>

        <Swiper 
        slidesPerView={5}
        spaceBetween={10}
        pagination={true}
        navigation={true}
        autoplay={{
            delay:2500,
            disableOnInteraction:false,
        }}
        modules={[Pagination,Autoplay,Navigation]} 
        className="h- object-cover rounded-md">

        {data?.map((item,index)=>
        <SwiperSlide>
            <img 
            className='rounded-md'
            src={item.download_url} alt="" />
        </SwiperSlide>
        )}
        
        
      </Swiper>
    </div>
  )
}

export default ContentCarousel