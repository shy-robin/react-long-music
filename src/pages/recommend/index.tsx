import React from 'react'
import Slider from '../../components/slider'

const Recommend = () => {
  // mock
  const bannerList = [1,2,3].map(item => {
    return {
      imgUrl:
        'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg',
    }
  })
  return (
    <div>
      <Slider bannerList={bannerList}></Slider>
    </div>
  )
}

export default React.memo(Recommend)
