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
       <Route path='/' exact component={Subreddit} /> 
       <Route path='/r/' component={Post} />
       <Route path='/' component={SearchResults} /> 
    
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
