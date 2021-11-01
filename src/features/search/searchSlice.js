import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const linkPost = (permalink) => `https://www.reddit.com/${permalink}.json`;

export const fetchSearchResultsAsync = createAsyncThunk(
  "search/fetchResults",
  async (link) => {
    const response = await fetch(`https://www.reddit.com/${link}`);
    
    const searchResults = await response.json(); 
    return searchResults; 
  }
);

export const searchSlice = createSlice({
    name: 'searcht',
    initialState: {
        searchData: [],
        status: 'idle'
    },
    extraReducers: {
        [fetchSearchResultsAsync.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSearchResultsAsync.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.searchData = action.payload; 
        },
        [fetchSearchResultsAsync.rejected]: (state,action) => {
            state.status = 'failed'
        }

    }
})

export default searchSlice.reducer; 
