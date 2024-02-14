import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';



function Banner() {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div style={{textAlign: 'center'}}> {/* Adjust layout as needed */}
            <img src="path/to/your/image.jpg" alt="Slide 1" style={{width: '100%', height: 'auto'}} />
            <h2>Your Text Here</h2>
            <button onClick={() => console.log('Button clicked!')}>Click Me</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;
