import React from 'react'
import styled from 'styled-components'
import commonStyle from '../../assets/css/commonStyle'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'


const themeColor = commonStyle['theme-color']

const SliderContainer = styled.div`
  img {
    width: 100%;
  }
  .swiper-pagination-bullet-active {
    background-color: ${themeColor} !important;
  }
`

interface Banner {
  id: number
  imgUrl: string
}

interface SliderProps {
  bannerList: Banner[]
}

const Slider = (props: SliderProps) => {
  const { bannerList } = props

  return (
    <SliderContainer>
      <Swiper
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {bannerList.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img src={banner.imgUrl} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  )
}

export default React.memo(Slider)
