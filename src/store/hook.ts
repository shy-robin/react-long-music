import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 加工 useDispatch 和 useSelector 函数，使其能够推断出 store 的相关类型（也可以不加工，但需要手动传入相关泛型，比较麻烦）
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
