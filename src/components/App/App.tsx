import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'

import MovieObject from '../../interfaces/MovieObject'

const App: React.FC<{ initial?: MovieObject[] }> = ({ initial = [] }) => {
  
  const [movies, setMovies] = useState(initial);

  useEffect(() => {
    console.log("useEffect")
    getPopular()
  }, [])

  const getPopular = () => {
    let baseUrl = "http://api.themoviedb.org/3"
    let apiKey = process.env.REACT_APP_API_KEY
    let url = `${baseUrl}/trending/movie/week?api_key=${apiKey}`
    let baseImageUrl = "https://image.tmdb.org/t/p/w500/"

    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let movieData: MovieObject[] = data.results.map( (item: any) => {
          let obj: MovieObject = {
            id: item.id,
            title: item.title,
            rating: item.vote_average,
            date: new Date(item.release_date),
            posterUrl: `${baseImageUrl}${item.poster_path}`
          }

          console.log(item.poster_path)

          return obj
        })

        setMovies(movieData)
      })
      .catch(error => {
        console.log("there was an error")
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Movie Database</h1>
      </header>
      <SearchBox></SearchBox>
      <h2>Popular Movies</h2>
      <MoviesList data={movies}></MoviesList>
      <MovieDetails></MovieDetails>
    </div>
  );
}

export default App;
