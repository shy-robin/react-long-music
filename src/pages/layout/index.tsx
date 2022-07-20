import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import commonStyle from '../../assets/css/commonStyle'
import { SearchOutlined, MenuOutlined } from '@ant-design/icons'

const themeColor = commonStyle['theme-color']
const fontColor = commonStyle['font-color-light']
const fontColorActive = commonStyle['font-color-light-active']

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 10px;
  background: ${themeColor};
  & > span {
    color: ${fontColor};
  }
`
const Tab = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-around;
  background: ${themeColor};
  a {
    font-size: 14px;
    color: ${fontColor};
    span {
      display: inline-block;
      height: 26px;
      padding: 5px 0;
    }
    &.active {
      span {
        font-weight: 700;
        color: ${fontColorActive};
        border-bottom: 2px solid ${fontColorActive};
      }
    }
  }
`
const TabItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Home = () => {
  return (
    <div>
      <Header>
        <MenuOutlined />
          <span>Title</span>
        <SearchOutlined />
      </Header>
      <Tab>
        <NavLink to="/recommend">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
    </div>
  )
}

export default React.memo(Home)
