import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './index'
import {
  getSingerListRequest,
  getHotSingerListRequest,
  Singer,
  HotSinger,
} from '@/api/singer'
import { SINGER_CATEGORY, INITIALS } from '@/utils/constant'

interface SingerSliceState {
  singerList: Singer[]
  hotSingerList: HotSinger[]
  enterLoading: boolean //控制进场 Loading
  pullUpLoading: boolean //控制上拉加载动画
  pullDownLoading: boolean //控制下拉加载动画
  pageCount: number //当前页数
  category: string
  initial: string
}

const initialState: SingerSliceState = {
  singerList: [],
  hotSingerList: [],
  enterLoading: false,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
  category: SINGER_CATEGORY[0].name,
  initial: INITIALS[0].name,
}

export const singerSlice = createSlice({
  name: 'singer',
  initialState,
  // 同步操作
  reducers: {
    changeSingerList(state, action: PayloadAction<Singer[]>) {
      state.singerList = action.payload
    },
    changeEnterLoading(state, action: PayloadAction<boolean>) {
      state.enterLoading = action.payload
    },
    changePullUpLoading(state, action: PayloadAction<boolean>) {
      state.pullUpLoading = action.payload
    },
    changePullDownLoading(state, action: PayloadAction<boolean>) {
      state.pullDownLoading = action.payload
    },
    changePageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    changeInitial(state, action: PayloadAction<string>) {
      state.initial = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSingerList.pending, (state) => {
        state.pageCount = 0
        state.singerList = []
        state.enterLoading = true
      })
      .addCase(fetchSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.enterLoading = false
      })
      .addCase(fetchSingerList.rejected, (state) => {
        state.enterLoading = false
      })
      .addCase(fetchMoreSingerList.pending, (state) => {
        state.pullUpLoading = true
        state.pageCount += 1
      })
      .addCase(fetchMoreSingerList.fulfilled, (state, action) => {
        state.singerList = [...state.singerList, ...action.payload]
        state.pullUpLoading = false
      })
      .addCase(fetchMoreSingerList.rejected, (state) => {
        state.pullUpLoading = false
        state.pageCount -= 1
      })
      .addCase(refreshSingerList.pending, (state) => {
        state.pageCount = 0
        state.singerList = []
        state.pullDownLoading = true
      })
      .addCase(refreshSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload
        state.pullDownLoading = false
      })
      .addCase(refreshSingerList.rejected, (state) => {
        state.pullDownLoading = false
      })
  },
})

// 同步操作
export const { changeCategory, changeInitial } = singerSlice.actions

// #region 异步操作
export const fetchSingerList = createAsyncThunk(
  'singer/fetchSingerList',
  async (_args, api) => {
    const rootState = api.getState() as RootState

    const { data } = await getSingerListRequest(
      rootState.singer.category,
      rootState.singer.initial,
      rootState.singer.pageCount
    )
    return data.artists
  }
)

export const fetchMoreSingerList = createAsyncThunk(
  'singer/fetchMoreSingerList',
  async (_args, api) => {
    // 获取状态
    const rootState = api.getState() as RootState

    const { data } = await getSingerListRequest(
      rootState.singer.category,
      rootState.singer.initial,
      rootState.singer.pageCount
    )
    return data.artists
  }
)

export const refreshSingerList = createAsyncThunk(
  'singer/refreshSingerList',
  async (_args, api) => {
    // 获取状态
    const rootState = api.getState() as RootState

    const { data } = await getSingerListRequest(
      rootState.singer.category,
      rootState.singer.initial,
      rootState.singer.pageCount
    )
    return data.artists
  }
)

export const fetchHotSingerList = createAsyncThunk(
  'singer/fetchHotSingerList',
  async (count: number) => {
    const { data } = await getHotSingerListRequest(count)
    return data.artists
  }
)
// #endregion

export default singerSlice.reducer
