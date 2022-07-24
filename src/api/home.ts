import ajax from "../utils/request";

export interface Banner {
  imageUrl: string
  targetId: number
  adid: unknown
  targetType: number
  titleColor: string
  typeTitle: string
  url: unknown
  exclusive: boolean
  monitorImpress: unknown
  monitorClick: unknown
  monitorType: unknown
  monitorImpressList: unknown
  monitorClickList: unknown
  monitorBlackList: unknown
  extMonitor: unknown
  extMonitorInfo: unknown
  adSource: unknown
  adLocation: unknown
  adDispatchJson: unknown
  encodeId: string
  program: unknown
  event: unknown
  video: unknown
  song: unknown
  scm: string
}

export interface BannerData {
  banners: Banner[]
  code: number
}

export const getHomeBanner = () => {
  return ajax.get<BannerData>('/banner')
}

export interface RecommendListItem {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}

export interface RecommendListData {
  hasTaste: boolean
  code: number
  category: number
  result: RecommendListItem[]
}

export const getRecommendList = () => {
  return ajax.get<RecommendListData>('/personalized')
}
