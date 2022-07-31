import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './homeSlice'
import singerReducer from './singerSlice'

const store = configureStore({
  reducer: {
    home: homeReducer,
    singer: singerReducer,
  },
})

export default store

// 从 store 中推断出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
