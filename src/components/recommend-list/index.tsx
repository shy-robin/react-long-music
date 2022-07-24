import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import commonStyle from '@/assets/css/commonStyle'
import { formatCount } from '@/utils/format'
import { RecommendListItem } from '@/api/home'

interface RecommendListProps {
  recommendList: RecommendListItem[]
}

const RecommendListContainer = styled.div`
  .title {
    padding: 5px;
    font-size: 16px;
    font-weight: 700;
    color: ${commonStyle['font-color-desc']};
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    .item-wrap {
      width: 33%;
      padding: 0 2px;
      .cover-wrap {
        position: relative;
        width: 100%;
        img {
          width: 100%;
          border-radius: 5px;
        }
        .play-count {
          font-size: 12px;
          color: ${commonStyle['font-color-light']};
          position: absolute;
          z-index: 9;
          top: 2px;
          left: 2px;
          .icon-play {
            margin-right: 3px;
          }
        }
        .shadow {
          ${commonStyle.textShadowOnImage()}
        }
      }
      .desc {
        font-size: 13px;
        color: ${commonStyle['font-color-desc']};
        margin: 5px 0;
        ${commonStyle.multiLineEllipsis(2)}
      }
    }
  }
`

const RecommendList = (props: RecommendListProps) => {
  const { recommendList } = props

  return (
    <RecommendListContainer>
      <div className="title">推荐歌单</div>
      <div className="content">
        {
          recommendList.map((item) => (
            <div className="item-wrap" key={item.id}>
              <div className="cover-wrap">
                <img src={item.picUrl+'?param=300x300'} alt="cover" />
                <span className='play-count'><PlayCircleOutlined className='icon-play' />{formatCount(item.playCount)}</span>
                <div className="shadow"></div>
              </div>
              <div className="desc">{item.name}</div>
            </div>
          ))
        }
      </div>
    </RecommendListContainer>
  )
}

export default React.memo(RecommendList)
