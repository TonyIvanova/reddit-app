import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSubredditAsync } from "./subredditSlice";
import { convertTime, upsconverter } from "../../helperFunctions";
import { PostLoading } from "../post/PostLoading";

//styling
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Card, Container, Row, Col } from "react-bootstrap";
//Router
import {  useHistory, useLocation } from "react-router-dom";

export function Subreddit() {
  //resux hook, used for routing   
  const history = useHistory();
  let location = useLocation(); 
  const dispatch = useDispatch();
  const status = useSelector((state) => state.subreddit.status);
  const subredditData = useSelector((state) => state.subreddit.subredditData);
  let subredditName = location.pathname;  


  useEffect(() => {
    dispatch(fetchSubredditAsync(subredditName));
  }, [subredditName, dispatch]);

  if (status === "loading") {
    return (
      <>
      
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </>
    );
  } else if (status === "succeeded") {
    let subredditPosts = subredditData.data.children;

    return (
      <>
    
      
        {subredditPosts.map((post, index) => {
          let {
            title,
            subreddit,
            ups,
            author_fullname,
            created,
            url_overridden_by_dest,
            post_hint,
            selftext,
            permalink,
            
          } = post.data;
          let embededVideo;
          try {
            embededVideo = post.data.secure_media_embed.media_domain_url;
          } catch {
            embededVideo = null;
          }
          let video;
          try {
            video = post.data.secure_media.reddit_video.fallback_url;
          } catch {
            video = null;
          }

          const timeCreated = convertTime(created);
          //
          return (
            <>
              <Container
                className="container-xs py-3"
                style={{ maxWidth: "600px" }}
              >
                <Row>
                  <Col className="col-2 text-center text-responsive">
                    <FaChevronUp style={{ color: "blue" }} />
                    <h2>{upsconverter(ups)}</h2>
                    <FaChevronDown style={{ color: "blue" }} />
                  </Col>

                  <Col className="col-10">
                    <Card className=" p-0 m-0">
                      <Card.Header>
                        <Container>
                          <Row className="justify-content-start">
                            <Col>
                              <p
                                className=" small onHover"
                                style={{ display: "inline-block" }}
                                onClick={() => {history.push('/');
                                 history.push(`r/${subreddit}`);
                                }}
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
                            {/* TITLE */}
                            <h4 className='onHover'
                            onClick={() => {
                              history.push('/');
                              history.push(`post${permalink}`); 
                              }}>
                              {" "}
                              {title}{" "}
                            </h4>
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
                  </Col>
                </Row>
              </Container>
            </>
          );
        })}
      </>
    );
  } else if (status === "failed") {
    
    return <>
    Error :/</>;
  }

  return <> <h1>Error </h1></>;
}
