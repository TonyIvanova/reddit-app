import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPostAsync } from "./postSlice";
import { store } from "../../app/store";
import { convertTime } from "../../helperFunctions";

export function Post() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.postData);
  const permalink = useSelector((state) => state.post.permalink);
 
  useEffect(() => {
    dispatch(fetchPostAsync(permalink));
  }, [permalink, dispatch]);

  if (status === "loading") {
    return <>loading...</>;
  } else if (status === "succeeded") {
    let { subreddit, title, ups, author_fullname, created } =
      postData[0].data.children[0].data;
    let video;

    // we need this block to prevent error in case of json path for video undefined. 
    try {
      video = postData[0].data.children[0].data.secure_media.reddit_video.fallback_url
    }
    catch {
      video = null; 
    }
    
    let image = postData[0].data.children[0].data.preview != null ? postData[0].data.children[0].data.preview.images : null; 
    
    const timeCreated = convertTime(created); 

    return (
      <>
        <p> subreddit: {subreddit} </p>
        <p>title: {title}</p>
        <p>ups {ups}</p>
        <p>Author {author_fullname}</p>
        <p>Created {timeCreated}</p>
        {image && <img src={image} alt='thumbnail' onerror="this.style.display='none'"/>} 
         {/* BUG image displaying when gets an error on server. Need FIX  */}
        {video && <iframe src={video} alt='video' title='uniquetitle' frameborder="0" allow="autoplay"/>}
      </>
    );
  } else if (status === "failed") {
    return <>Error :/</>;
  }

  return (
    <div className="post">
      <h1>something went wrong </h1>
    </div>
  );
}
