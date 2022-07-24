import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Banner, RecommendListItem, getHomeBanner, getRecommendList } from '@/api/home'

interface State {
  bannerList: Banner[]
  recommendList: RecommendListItem[]
}

const initialState: State = {
  bannerList: [],
  recommendList: [],
}

// #region 异步操作
export const fetchBanner = createAsyncThunk('home/fetchBanner', async () => {
  const { data } = await getHomeBanner()
  return data.banners
})

export const fetchRecommendList = createAsyncThunk('home/fetchRecommendList', async () => {
  const { data } = await getRecommendList()
  return data.result
})
// #endregion

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.bannerList = action.payload
      })
      .addCase(fetchRecommendList.fulfilled, (state, action) => {
        state.recommendList = action.payload
      })
  }
})

export default counterSlice.reducer
