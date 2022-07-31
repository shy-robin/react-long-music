import React, { useEffect } from 'react'
import styled from 'styled-components'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import {
  fetchSingerList,
  fetchMoreSingerList,
  refreshSingerList,
} from '@/store/singerSlice'

const SingerListContainer = styled.div`
  position: fixed;
  top: 152px;
  bottom: 0;
  left: 0;
  right: 0;
`

const SingerListItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 3px;
    margin-right: 10px;
  }
`

const ScrollContent = styled.div`
  padding: 12px 0;
`

const SingerList = () => {
  const singerList = useAppSelector((state) => state.singer.singerList)
  const enterLoading = useAppSelector((state) => state.singer.enterLoading)
  const pullUpLoading = useAppSelector((state) => state.singer.pullUpLoading)
  const pullDownLoading = useAppSelector(
    (state) => state.singer.pullDownLoading
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSingerList())
  }, [])

  const handlePullUp = () => {
    dispatch(fetchMoreSingerList())
  }

  const handlePullDown = () => {
    dispatch(refreshSingerList())
  }

  return (
    <SingerListContainer>
      <Scroll
        pullUpLoading={pullUpLoading}
        pullDownLoading={pullDownLoading}
        onPullUp={handlePullUp}
        onPullDown={handlePullDown}
      >
        <ScrollContent>
          {singerList.map((item) => (
            <SingerListItem key={item.id}>
              <img src={item.img1v1Url + '?param=60x60'} alt={item.name} />
              <span>{item.name}</span>
            </SingerListItem>
          ))}
        </ScrollContent>
      </Scroll>
      {enterLoading && <Loading />}
    </SingerListContainer>
  )
}

export default React.memo(SingerList)
