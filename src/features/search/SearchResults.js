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
import {useLocation} from 'react-router-dom'; 

export function SearchResults() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.search.status);
    const searchData = useSelector((state) => state.search.searchData);


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
        let title= item.data.title; 
        return (
      <Card className=" p-0 m-0">
          <Card.Header>
  
          {title}
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