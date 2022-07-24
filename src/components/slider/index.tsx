import React from 'react'
import styled from 'styled-components'
import commonStyle from '@/assets/css/commonStyle'
import { Banner } from '@/api/home'

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
      >
        {bannerList.map((banner) => (
          <SwiperSlide key={banner.imageUrl}>
            <img src={banner.imageUrl} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  )
}

export default React.memo(Slider)
