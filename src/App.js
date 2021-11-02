import React from 'react';
import { Post } from './features/post/Post';

import { Subreddit } from './features/subreddit/Subreddit'; 
import {SearchResults} from './features/search/SearchResults';
import {SearchBar} from './features/search/SearchBar'; 
import './custom.scss'; 
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <SearchBar />
     <Switch> 
     <Route path='/r/' component={Subreddit} /> 
       <Route path='/post/' component={Post} />
       <Route path='/search/' component={SearchResults} /> 
       <Route path='/' component={Subreddit} /> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
