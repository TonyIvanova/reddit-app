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
        permalink: 'r/Damnthatsinteresting/comments/qe0ng3/tactical_backpack_demonstration/',
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
