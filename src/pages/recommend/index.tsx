import React, { useEffect } from 'react'
import Slider from '@/components/slider'
import RecommendList from '@/components/recommend-list'
import Scroll from '@/components/scroll'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { fetchBanner, fetchRecommendList } from '@/store/homeSlice'

const ScrollContainer = styled.div`
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`

const Recommend = () => {
  const bannerList = useAppSelector((state) => state.home.bannerList)
  const recommendList = useAppSelector((state) => state.home.recommendList)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBanner())
    dispatch(fetchRecommendList())
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
