import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
  

 
  login: localStorage.getItem('login2')
    ? JSON.parse(localStorage.getItem('login2'))
    : [],
 
  video: localStorage.getItem('video')
    ? JSON.parse(localStorage.getItem('video'))
    : [],
    history: localStorage.getItem('history')
    ? JSON.parse(localStorage.getItem('history'))
    : [],
  commentSEND: localStorage.getItem('commentSEND')
    ? JSON.parse(localStorage.getItem('commentSEND'))
    : [],
}

export const dataSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    getVideo: (state, action) => {
      state.video = action.payload
      localStorage.setItem('video', JSON.stringify(state.video))
    },

    getComment: (state, action) => {
      state.commentSEND = action.payload
      localStorage.setItem('commentSEND', JSON.stringify(state.commentSEND))
    },

    getLogin: (state, action) => {
      state.login = action.payload
      localStorage.setItem('login2', JSON.stringify(state.login))
    },

    getLoginOut: (state, action) => {
      state.login = null
    },
  
    getHistory: (state, action) => {
      state.history = action.payload
      localStorage.setItem('video', JSON.stringify(state.history))
    },

  },
})

export const {
  getLoginOut,
 getHistory,
  getVideo,
  getComment,
   getLogin,
 
} = dataSlice.actions



export const selectUser = (state) => state.basket.login

export const selectHistory = (state) => state.basket.history
export const selectVideo = (state) => state.basket.video
export const selectComment = (state) => state.basket.commentSEND

export default dataSlice.reducer
