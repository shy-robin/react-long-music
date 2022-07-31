import ajax from '@/utils/request'

// #region 获取热门歌手列表
export interface HotSinger {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: string[]
  trans: string
  musicSize: number
  topicPerson: number
  showPrivateMsg: unknown
  isSubed: unknown
  accountId: unknown
  picId_str: string
  img1v1Id_str: string
  transNames: unknown
  followed: boolean
  mvSize: unknown
  publishTime: unknown
  identifyTag: unknown
  alg: unknown
  fansCount: unknown
}

export interface HotSingerData {
  artists: HotSinger[]
  code: number
  more: boolean
}

export const getHotSingerListRequest = (count: number) => {
  return ajax.get<HotSingerData>(`/top/artists?offset=${count}`)
}
// #endregion

// #region 获取歌手列表
export interface Singer {
  accountId: number
  albumSize: number
  alias: string[]
  briefDesc: string
  followed: boolean
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
}

export interface SingerData {
  artists: Singer[]
  code: number
  more: boolean
}

export const getSingerListRequest = (
  category: string,
  initial: string,
  count: number
) => {
  return ajax.get<SingerData>(
    `/artist/list?cat=${category}&initial=${initial.toLowerCase()}&offset=${count}`
  )
}
// #endregion
