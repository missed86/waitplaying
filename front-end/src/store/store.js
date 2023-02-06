import { configureStore } from '@reduxjs/toolkit'
import PlatformFilterReducer from './PlatformFilterSlice'

export default configureStore({
  reducer: {
    PlatformFilter: PlatformFilterReducer
  }
})