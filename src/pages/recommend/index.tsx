import React from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommend-list'
import Scroll from '../../components/scroll'
import styled from 'styled-components'

const ScrollContainer = styled.div`
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`

const Recommend = () => {
  // mock
  const bannerList = [1, 2, 3].map((item) => {
    return {
      id: item,
      imgUrl:
        'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg',
    }
  })

  const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    return {
      id: item,
      picUrl:
        'https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
      playCount: 17171122,
      name: '朴树、许巍、李健、郑钧、老狼、赵雷、许巍、李健、郑钧、老狼、赵雷',
    }
  })

  return (
    <ScrollContainer>
      <Scroll>
        <Slider bannerList={bannerList} />
        <RecommendList recommendList={recommendList} />
      </Scroll>
    </ScrollContainer>
  )
}

export default React.memo(Recommend)
