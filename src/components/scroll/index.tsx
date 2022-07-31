import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'
import BetterScroll from 'better-scroll'
import styled from 'styled-components'
import LoadingV2 from '@/components/loading-v2'

interface ScrollProps {
  /** 滚动方向 */
  direction?: 'vertical' | 'horizontal'
  /** 是否支持点击 */
  click?: boolean
  /** 是否刷新 */
  refresh?: boolean
  /** 滚动触发的回调函数 */
  onScroll?: () => void
  /** 上拉加载加载逻辑 */
  onPullUp?: () => void
  /** 下拉加载逻辑 */
  onPullDown?: () => void
  /** 是否显示上拉加载动画 */
  pullUpLoading?: boolean
  /** 是否显示下拉加载动画 */
  pullDownLoading?: boolean
  /** 是否支持向上吸顶 */
  bounceTop?: boolean
  /** 是否支持向下吸底 */
  bounceBottom?: boolean
}

const defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
}

export interface ScrollHandle {
  refresh: () => void
  getScroll: () => BetterScroll | null
}

const ScrollContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`

const PullDownLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const PullUpLoading = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

/*
  React.forwardRef（意为传递 ref） 用于创建一个可以调用 ref 的组件，一般给组件设置一个 ref 属性，只是向组件内传递一个名为 ref 的数据，
  而父组件无法获取到该组件的 DOM。
  使用 forwardRef + useImperativeHandle 就可以使父组件获取到子组件的 DOM 和其暴露的方法，其中 forwardRef 用于使父组件接收传递的 ref（即 DOM），
  useImperativeHandle 用于使父组件获取子组件暴露的方法。

  React.forwardRef<T, K>((props, ref) => {})， 其中 T 代表的是 ref 的类型，而 K 代表的是 props 的类型，
  props 具有 children 属性，即插槽内容，声明 props 类型时通常不会带上 children 类型，可以使用 React.PropsWithChildren 加上该参数。
  
  举例：
    <Parent>
      <Scroll name={xxx} age={yyy} ref={zzz} />
    </Parent>
  其中，name、age 传入到 Scroll 中的 props 里，而 ref 传入到 ref 里。
*/
const Scroll = React.forwardRef<
  ScrollHandle,
  React.PropsWithChildren<ScrollProps>
>((props, ref) => {
  const {
    direction,
    click,
    refresh,
    onScroll,
    onPullUp,
    onPullDown,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = { ...defaultProps, ...props }

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const [bScroll, setBScroll] = useState<BetterScroll | null>(null)

  // 挂载阶段
  useEffect(() => {
    if (!scrollContainerRef.current) return
    const scroll = new BetterScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)

    return () => {
      setBScroll(null)
    }
  }, [])

  // 绑定滚动事件
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)

    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  // 绑定上拉到底事件
  useEffect(() => {
    if (!bScroll || !onPullUp) return
    bScroll.on('scrollEnd', () => {
      if (bScroll.y === bScroll.maxScrollY) {
        onPullUp()
      }
    })

    return () => {
      bScroll.off('scrollEnd')
    }
  }, [bScroll, onPullUp])

  // 绑定下拉刷新事件
  useEffect(() => {
    if (!bScroll || !onPullDown) return
    bScroll.on('touchEnd', (pos: { x: number; y: number }) => {
      if (pos.y >= 50) {
        onPullDown()
      }
    })

    return () => {
      bScroll.off('touchEnd')
    }
  }, [bScroll, onPullDown])

  // 每次重新渲染触发
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // 向外暴露 ref 方法
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getScroll() {
      return bScroll
    },
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {/* 注意，滚动容器内只能有一个子元素，否则会无法滚动，因此要用 div 包裹需要滚动的内容 */}
      {props.children}
      {pullUpLoading && (
        <PullUpLoading>
          <LoadingV2 />
        </PullUpLoading>
      )}
      {pullDownLoading && (
        <PullDownLoading>
          <LoadingV2 />
        </PullDownLoading>
      )}
    </ScrollContainer>
  )
})

export default Scroll
