import React from 'react';
import { Post } from './features/post/Post';
import ScrollToTop from './ScrollToTop';
import { Subreddit } from './features/subreddit/Subreddit'; 
import {SearchResults} from './features/search/SearchResults';
import {SearchBar} from './features/search/SearchBar'; 
import './custom.scss'; 
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import { Error } from './features/error/Error';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
    <ScrollToTop />
     <SearchBar />
     <Switch> 
     <Route path='/r/' component={Subreddit} /> 
       <Route path='/post/' component={Post} />
       <Route path='/search/' component={SearchResults} /> 
       <Route path='/' exact component={Subreddit} /> 
       <Route path='/' component={Error} /> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
