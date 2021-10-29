import React from 'react';
import { Post } from './features/post/Post';
import {PostLoading} from './features/post/PostLoading'; 
import { Subreddit } from './features/subreddit/Subreddit'; 

import {SearchBar} from './features/search/SearchBar'; 
import './custom.scss'; 

function App() {

  return (
    <div className="App">
     
      <Subreddit /> 
    </div>
  );
}

export default App;
