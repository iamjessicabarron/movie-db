import React from 'react';
import logo from './logo.svg';
import './App.css';

import MovieList from '../MovieList/MovieList'
import SearchBox from '../SearchBox/SearchBox'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        The Movie Database
      </header>
      <SearchBox></SearchBox>
      <MovieList></MovieList>
    </div>
  );
}

export default App;
