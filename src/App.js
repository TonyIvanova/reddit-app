import React from 'react';
import { Post } from './features/post/Post';
import {PostLoading} from './features/post/PostLoading'; 
import { Subreddit } from './features/subreddit/Subreddit'; 

import {SearchBar} from './features/search/SearchBar'; 
import './custom.scss'; 
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 

function App() {

  return (
    <BrowserRouter>
    <div className="App">
     <Switch> 
      <Route path='/' exact > 
      <Subreddit /> 
      </Route>
      <Route>
        <Post path='/r/' />
      </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
