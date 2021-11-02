import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSearchResultsAsync } from "./searchSlice";
import { store } from "../../app/store";
import { convertTime, upsconverter } from "../../helperFunctions";
// styling
import { Card, Container, Row, Col, Placeholder } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {PostLoading} from '../post/PostLoading'; 
// routing 
import {useLocation, useHistory } from 'react-router-dom'; 

export function SearchResults() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.search.status);
    const searchData = useSelector((state) => state.search.searchData);

let history = useHistory(); 
let location = useLocation(); 
let link = location.search;
console.log(link); 
  useEffect(() => {
    dispatch(fetchSearchResultsAsync(`/search.json${link}`));
  }, [link, dispatch]);


    if (status === "loading") {
    return <><PostLoading /></>;
  } else if (status === "succeeded") {
    const searchResults=searchData.data.children; 
  
   
    return <>
    <Container className="container-xs py-3"
                style={{ maxWidth: "600px" }}>
    {searchResults.map((item)=>{
        let {
            subreddit,
            title,
            ups,
            author_fullname,
            created,
            url_overridden_by_dest,
            permalink
          }= item.data; 

          const timeCreated = convertTime(created);
        return (
      <Card className=" p-0 m-0">
          <Card.Header>
          <p
                                className=" small "
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
                          by {author_fullname} {timeCreated} </p>
                          <h4 onClick={() => {
                              history.push('/');
                              history.push(`post${permalink}`); 
                              }}>{title}</h4>
         </Card.Header>
          </Card>
      
    )} )}
    </ Container>
     </>;
} else if (status === "failed") {
    return <>Errorrrr :/</>;
}


return (
    <div className="post">
      <h1>something went really wrong </h1>
    </div>
  );
}