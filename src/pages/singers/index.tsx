import React, { useState } from 'react'
import HorizontalBar from '@/components/horizontal-bar'
import { SINGER_CATEGORY, INITIALS } from '@/utils/constant'
import styled from 'styled-components'
import SingerList from '@/components/singer-list'
import { useAppDispatch } from '@/store/hook'
import {
  changeCategory,
  changeInitial,
  fetchSingerList,
} from '@/store/singerSlice'

const SingersContainer = styled.div``

const CategoryWrap = styled.div`
  padding: 5px 0;
  width: 100%;
`

const InitialWrap = styled.div`
  padding: 5px 0;
  width: 100%;
`

const Singers = () => {
  const [categoryKey, setCategoryKey] = useState(SINGER_CATEGORY[0].key)
  const [initialKey, setInitialKey] = useState(INITIALS[0].key)

  const dispatch = useAppDispatch()

  const handleCategoryItemClick = (index: number) => {
    setCategoryKey(SINGER_CATEGORY[index].key)
    dispatch(changeCategory(SINGER_CATEGORY[index].name))
    dispatch(fetchSingerList())
  }

  const handleInitialItemClick = (index: number) => {
    setInitialKey(INITIALS[index].key)
    dispatch(changeInitial(INITIALS[index].name))
    dispatch(fetchSingerList())
  }

  return (
    <SingersContainer>
      <CategoryWrap>
        <HorizontalBar
          label="分类: "
          currentKey={categoryKey}
          list={SINGER_CATEGORY}
          handleClick={handleCategoryItemClick}
        />
      </CategoryWrap>
      <InitialWrap>
        <HorizontalBar
          label="首字母: "
          currentKey={initialKey}
          list={INITIALS}
          handleClick={handleInitialItemClick}
        />
      </InitialWrap>
      <SingerList />
    </SingersContainer>
  )
}

export default React.memo(Singers)
