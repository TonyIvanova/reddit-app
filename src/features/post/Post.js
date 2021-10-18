import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPostAsync } from "./postSlice";
import { store } from "../../app/store";

export function Post() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.post.status);
  const postData = useSelector((state) => state.post.postData)
  // const status = state.status; 
  // response0 data children 0 subreddit response subreddit
  


  useEffect(() => {
    
    dispatch(fetchPostAsync());
  }, [dispatch]);

let content; 

  if (status === 'loading') {
    content = 'loading...';
  } else if (status === 'succeeded'){
    let {subreddit, title, ups, author_fullname, created} = postData[0].data.children[0].data; 
    content = `
    
    <p> subreddit: ${subreddit} </p> 
    <p>title: ${title}</p>
    <p>ups ${ups}</p>
    <p>Author ${author_fullname}</p>
    <p>Created ${created}</p>
    
    
    
    `;
  } else if (status === 'failed') {
    content = 'Error :('
  }
  
  return (

<div className="post">
<h1>Content will be here </h1>
<h1>{content}</h1>

</div>


  );
}
