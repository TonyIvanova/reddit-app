import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/post/postSlice";
import subredditReducer from "../features/subreddit/subredditSlice"; 

export const store = configureStore({
  reducer: {
    post: postReducer,
    subreddit: subredditReducer
  },
});
