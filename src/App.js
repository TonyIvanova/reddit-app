import React from 'react';
import { Post } from './features/post/Post';
import { Subreddit } from './features/subreddit/Subreddit'; 
import './App.css';
import {SearchBar} from './features/search/SearchBar'; 

function App() {

  return (
    <div className="App">
     
      <Post /> 
    </div>
  );
}

export default App;
