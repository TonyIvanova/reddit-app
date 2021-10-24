import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSubredditAsync } from "./subredditSlice";
import { convertTime } from "../../helperFunctions";

export function Subreddit() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.subreddit.status);
  const subredditData = useSelector((state) => state.subreddit.subredditData);
  const subreddit_name_prefixed = useSelector(
    (state) => state.subreddit.subreddit_name_prefixed
  );

  useEffect(() => {
    dispatch(fetchSubredditAsync(subreddit_name_prefixed));
  }, [subreddit_name_prefixed, dispatch]);

  

  if (status === "loading") {
    return <>loading...</>;
  } else if (status === "succeeded") {
    let subredditPosts = subredditData.data.children;
    
    return (
      <>
        {subredditPosts.map((post, index) => {
          let {title, subreddit, ups, author_fullname, created, url_overridden_by_dest, post_hint} = post.data;
          let embededVideo;
          try{embededVideo = post.data.secure_media_embed.media_domain_url;}
          catch{embededVideo = null}
          let video; 
          try {
            video = post.data.secure_media.reddit_video.fallback_url
          }
          catch {
            video = null; 
          }
          
          const timeCreated = convertTime(created); 
        //    
          return (
            <>
              <h1>{title}</h1>
              <p> subreddit: {subreddit} </p>
              <p>title: {title}</p>
              <p>ups {ups}</p>
              <p>Author {author_fullname}</p>
              <p>Created {timeCreated} </p>
              {post_hint==="image" && <img src={url_overridden_by_dest} alt={title} />}
              {post_hint==='rich:video' && embededVideo && <iframe src={embededVideo} alt='video' title={title} frameborder="0" allow="autoplay"/>}
              {video && <iframe src={video} alt='video' title='uniquetitle' frameborder="0" allow="autoplay"/>}
            </>
              )}
          )}
    </>
    )
    
 } else if (status === "failed") {
    return <>Error :/</>;
  }

  return <h1>Error </h1>;
}
