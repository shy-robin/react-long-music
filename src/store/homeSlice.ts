import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  Banner,
  RecommendListItem,
  getHomeBanner,
  getRecommendList,
} from '@/api/home'

interface State {
  bannerList: Banner[]
  recommendList: RecommendListItem[]
  isLoading: boolean
}

const initialState: State = {
  bannerList: [],
  recommendList: [],
  isLoading: false,
}

// #region 异步操作
export const fetchBanner = createAsyncThunk('home/fetchBanner', async () => {
  const { data } = await getHomeBanner()
  return data.banners
})

export const fetchRecommendList = createAsyncThunk(
  'home/fetchRecommendList',
  async () => {
    const { data } = await getRecommendList()
    return data.result
  }
)
// #endregion

export const counterSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.bannerList = action.payload
        state.isLoading = false
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(fetchRecommendList.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchRecommendList.fulfilled, (state, action) => {
        state.recommendList = action.payload
        state.isLoading = false
      })
      .addCase(fetchRecommendList.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export default counterSlice.reducer
