// used only for reference and planing 

const state = {
  post: {
    postData: [], //postData[0].data.children[0].data path to data on post { subreddit, title, ups, author_fullname, created }
    status: "", // idle | loading | succeeded | failed
    permalink: "", // for ex 'r/AskReddit/comments/qae4lg/whats_that_one_disgusting_thing_that_everybody/'
    //comments ?
  },
  searchResult: {
    value: "",
    permalinks: [],
  },
  subreddit: {
    subreddit_name_prefixed: "r/all/",
    subredditData: [],
    status: "idle",
  },
};
