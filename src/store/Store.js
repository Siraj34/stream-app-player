import { configureStore } from '@reduxjs/toolkit'
import dataSlice from '../reducer/VideoReducer'

//import dataSlice from '../reducer/VideoReducer'

export const Store = configureStore({
  reducer: {
    basket: dataSlice,
  },
})
