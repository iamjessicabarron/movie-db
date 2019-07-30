import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from '../MovieList/MovieList'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        The Movie Database
      </header>
      <MovieList></MovieList>
    </div>
  );
}

export default App;
