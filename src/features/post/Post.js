import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPostAsync } from "./postSlice";
import { store } from "../../app/store";
import { convertTime, upsconverter } from "../../helperFunctions";
// styling
import { Card, Container, Row, Col, Placeholder } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {PostLoading} from './PostLoading'; 
// routing 
import {useLocation} from 'react-router-dom'; 

export function Post() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.postData);


  //const permalink = useSelector((state) => state.post.permalink);
let location = useLocation(); 

let permalink = location.pathname;


  useEffect(() => {
    dispatch(fetchPostAsync(permalink));
  }, [permalink, dispatch]);

  if (status === "loading") {
    return <><PostLoading /></>;
  } else if (status === "succeeded") {

    let {
      subreddit,
      title,
      ups,
      author_fullname,
      created,
      post_hint,
      selftext,
      url_overridden_by_dest
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
        <Container className="container-xs py-3" style={{ maxWidth: "700px" }}>
          <Row>
            <Col className="col-2 text-center ">
              <FaChevronUp style={{ color: "blue" }} />
              <h2>{upsconverter(ups)}</h2>
              <FaChevronDown style={{ color: "blue" }} />
            </Col>

            <Col className="col-10">
              <Card className=" p-0 m-0">
                <Card.Header className='post-header'>
                  <Container>
                    <Row className="justify-content-start">
                      <Col>
                        <p
                          className=" small "
                          style={{ display: "inline-block" }}
                        >
                          {" "}
                          r\{subreddit}&#160;·&#160;
                        </p>
                        
    
                        <p
                          className="text-muted small "
                          style={{ display: "inline-block" }}
                        >
                          by {author_fullname} {timeCreated}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <h4> {title} </h4>
                      
                    </Row>
                  </Container>
                </Card.Header>
                <Card.Body className="p-3 text-center">
                  <p>{selftext}</p>

                  {post_hint === "image" && (
                    <img
                      src={url_overridden_by_dest}
                      alt="thumbnail"
                      style={{ height: "auto", width: "100%" }}
                      className=""
                    />
                  )}
                  {post_hint === "rich:video" && embededVideo && (
                    <iframe
                      src={embededVideo}
                      alt="video"
                      title={title}
                      frameborder="0"
                      allow="autoplay"
                      className="w-75 "
                      style={{ height: "100%", width: "100%" }}
                      
                    />
                  )}
                  {video && (
                    <iframe
                      src={video}
                      alt="video"
                      title="uniquetitle"
                      frameborder="0"
                      allow="autoplay"
                      className="w-75" // Help! I don't know how to center it horizontaly. Margin doesn't work idk why.
                      style={{ height: " 450px" }}
                    />
                  )}
            </Card.Body>
              </Card>

          <h2 className='pt-5 pb-3'>Comments </h2>
          {commentsData.map((comment) => {
            let replies;
            try {
              replies = comment.data.replies.data.children[0];
            } catch {
              replies = null;
            }

            return (
              <>
                <Card className='my-1 border-0 '>
                  <Card.Body>
                    <p className=" small"  style={{ display: "inline-block" }}> {comment.data.author}&#160;·&#160;</p><p className=" small text-muted "  style={{ display: "inline-block" }}> {convertTime(comment.data.created)} </p>
                    <p> {comment.data.body} </p>
                    

                    
                      {/* <p> {replies && replies.data.author} </p>
                      <p> {replies && replies.data.body} </p>
                      <p> {replies && convertTime(replies.data.created)} </p>
                     */}
                  </Card.Body>
                </Card>
              </>
            );
          })}
              
            </Col>
          </Row>
        </Container>
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
