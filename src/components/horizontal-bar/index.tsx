import React from 'react'
import Scroll from '@/components/scroll'
import { BarItem } from '@/utils/constant'
import styled from 'styled-components'
import commonStyle from '@/assets/css/commonStyle'

interface HorizontalBarProps {
  label: string
  list: BarItem[]
  currentKey: string
  handleClick?: (key: string) => void
}

const defaultProps = {
  handleClick: () => {},
}

const ScrollContainer = styled.div`
  overflow: hidden;
  padding: 2px 5px;
`

const List = styled.div`
  display: inline-block;
  white-space: nowrap;
`

const Label = styled.span`
  display: inline-block;
  padding: 2px 5px;
  color: ${commonStyle['font-color-desc-v2']};
  font-weight: bold;
`

const ListItem = styled.span`
  display: inline-block;
  margin: 0 1px;
  padding: 3px 5px;
  color: ${commonStyle['font-color-desc']};
  &.active {
    border-radius: 5px;
    background-color: ${commonStyle['theme-color']};
    color: #fff;
  }
`

const HorizontalBar = (props: HorizontalBarProps) => {
  const { label, list, currentKey, handleClick } = {
    ...defaultProps,
    ...props,
  }

  return (
    <ScrollContainer>
      <Scroll direction="horizontal">
        <List>
          <Label>{label}</Label>
          {list.map((item) => (
            <ListItem
              key={item.key}
              className={`item ${item.key === currentKey ? 'active' : ''}`}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </Scroll>
    </ScrollContainer>
  )
}

export default React.memo(HorizontalBar)
