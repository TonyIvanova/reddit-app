import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../features/post/postSlice";
import subredditReducer from "../features/subreddit/subredditSlice"; 
import searchReducer from '../features/search/searchSlice';


export const store = configureStore({
  reducer: {
    post: postReducer,
    subreddit: subredditReducer,
    search: searchReducer
  },
});
