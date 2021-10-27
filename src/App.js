import React from 'react';
import { Post } from './features/post/Post';
import { Subreddit } from './features/subreddit/Subreddit'; 

import {SearchBar} from './features/search/SearchBar'; 
import './custom.scss'; 

function App() {

  return (
    <div className="App">
     
      <Post /> 
    </div>
  );
}

export default App;
