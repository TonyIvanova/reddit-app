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
    let {
      subreddit,
      title,
      ups,
      author_fullname,
      created,
      post_hint,
      selftext,
    } = postData[0].data.children[0].data;
    let video;

    // we need this block to prevent error in case of json path for video undefined.
    try {
      video =
        postData[0].data.children[0].data.secure_media.reddit_video
          .fallback_url;
    } catch {
      video = null;
    }

    let image =
      postData[0].data.children[0].data.preview != null
        ? postData[0].data.children[0].data.preview.images
        : null;
    let embededVideo;
    try {
      embededVideo =
        postData[0].data.children[0].data.secure_media_embed.media_domain_url;
    } catch {
      embededVideo = null;
    }

    // 1.data.children[0].data.body
    let commentsData = postData[1].data.children;
    const timeCreated = convertTime(created);

    return (
      <>
        <p> subreddit: {subreddit} </p>
        <p>title: {title}</p>
        <p>{selftext}</p>
        <p>ups {ups}</p>
        <p>Author {author_fullname}</p>
        <p>Created {timeCreated}</p>
        {post_hint === "image" && (
          <img
            src={image}
            alt="thumbnail"
            onerror="this.style.display='none'"
          />
        )}
        {post_hint === "rich:video" && embededVideo && (
          <iframe
            src={embededVideo}
            alt="video"
            title={title}
            frameborder="0"
            allow="autoplay"
          />
        )}
        {video && (
          <iframe
            src={video}
            alt="video"
            title="uniquetitle"
            frameborder="0"
            allow="autoplay"
          />
        )}

        <h2>Comments </h2>
        {commentsData.map((comment) => {
          let replies;
          try {
            replies = comment.data.replies.data.children[0];
          } catch {
            replies = null;
          }

          return (
            <>
              <p> {comment.data.author} </p>
              <p> {comment.data.body} </p>
              <p> {convertTime(comment.data.created)} </p>
              <h2>replies</h2>
         
              <p> {replies && replies.data.author} </p>
              <p> {replies && replies.data.body} </p>
              <p> {replies && convertTime(replies.data.created)} </p>
              <h2>______</h2>
            </>
          );
        })}
      </>
    );
  } else if (status === "failed") {
    return <>Error :/</>;
  }

  return (
    <div className="post">
      <h1>something went really wrong </h1>
    </div>
  );
}
