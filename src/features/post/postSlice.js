import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const linkPost = (permalink) => `https://www.reddit.com/${permalink}.json`;

export const fetchPostAsync = createAsyncThunk(
  "post/fetchPost",
  async (permalink) => {
    const response = await fetch(`https://www.reddit.com/${permalink}.json`);
    
    const post = await response.json(); 
    return post; 
  }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        permalink: 'r/PewdiepieSubmissions/comments/qgs6rt/ofcourse_im_the_sigma/',
        postData: [],
        status: 'idle'
    },
    extraReducers: {
        [fetchPostAsync.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPostAsync.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.postData = action.payload; 
        },
        [fetchPostAsync.rejected]: (state,action) => {
            state.status = 'failed'
        }

    }
})

export default postSlice.reducer; 
