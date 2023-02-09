import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from '../store'


// custom hook para tipar el useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch
//  custom hook para tipar el useSelector y que muestre y que tenga acceso al tipado del estado
// global
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector