import React, { useEffect, useState } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommend-list'
import Scroll from '../../components/scroll'
import styled from 'styled-components'
import { getHomeBanner, Banner, getRecommendList, RecommendListItem } from '../../api/home'

const ScrollContainer = styled.div`
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`

const Recommend = () => {
  const [bannerList, setBannerList] = useState<Banner[]>([])

  const [recommendList, setRecommendList] = useState<RecommendListItem[]>([])

  const fetchData = async () => {
    const { data: bannerData } = await getHomeBanner()
    setBannerList(bannerData.banners)
    const { data: recommendData } = await getRecommendList()
    setRecommendList(recommendData.result)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
