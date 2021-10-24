import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubredditAsync = createAsyncThunk(
  "subreddit/fetchSubreddit",
  async (subreddit_name_prefixed) => {
    const response = await fetch(`https://www.reddit.com/${subreddit_name_prefixed}.json`);

    const subreddit = await response.json();
    return subreddit;
  }
);

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    subreddit_name_prefixed: "r/all/",
    subredditData: [],
    status: "idle",
  },
  extraReducers: {
    [fetchSubredditAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSubredditAsync.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.subredditData = action.payload;
    },
    [fetchSubredditAsync.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default subredditSlice.reducer;
