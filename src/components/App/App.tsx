import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'

import MovieObject from '../../interfaces/MovieObject'
import { getFromApi } from '../../helpers'

const App: React.FC<{ initial?: MovieObject[] }> = ({ initial = [] }) => {
  
  const [movies, setMovies] = useState(initial);
  const [selectedMovie, setSelectedMovie] = useState<MovieObject | null>(null)

  useEffect(() => {
    getPopular()
  }, [])

  const getMovie = (movie: MovieObject) => {
    setSelectedMovie(movie)
  }

  const getPopular = () => {
    let baseImageUrl = process.env.REACT_APP_API_IMAGE_URL

    getFromApi(`/movie/popular`)
      .then((data) => {
        let movieData: MovieObject[] = data.results.map( (item: any) => {
          let obj: MovieObject = {
            id: item.id,
            title: item.title,
            rating: item.vote_average,
            date: new Date(item.release_date),
            posterUrl: `${baseImageUrl}${item.poster_path}`,
            coverUrl: `${baseImageUrl}${item.backdrop_path}`,
            overview: item.overview,
            runtime: item.runtime
          }
          return obj
        })

        setMovies(movieData)
      })
      .catch(error => {
        console.log("There was an getting movie runtime")
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Movie Database</h1>
      </header>
      <SearchBox></SearchBox>
      <h2>Popular Movies</h2>
      <MoviesList data={movies} onClick={ getMovie }></MoviesList>
      <MovieDetails movie={selectedMovie} onBackClick={() => {setSelectedMovie(null)}}></MovieDetails>
    </div>
  );
}

export default App;
