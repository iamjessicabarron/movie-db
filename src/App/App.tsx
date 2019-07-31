import React from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        The Movie Database
      </header>
      <SearchBox></SearchBox>
      <h2>Popular Movies</h2>
      <MoviesList></MoviesList>
      <MovieDetails></MovieDetails>
    </div>
  );
}

export default App;
