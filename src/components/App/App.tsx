import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'

import MovieObject from '../../interfaces/MovieObject'
import { getFromApi } from '../../helpers'

import { MovieAdapter } from '../../adapters/index'

const App: React.FC<{ initial?: MovieObject[] }> = ({ initial = [] }) => {
  
  const [pageIndex, setPageIndex] = useState(0)
  const [movies, setMovies] = useState(initial);
  const [selectedMovie, setSelectedMovie] = useState<MovieObject | null>(null)

  const movieAdapter = new MovieAdapter()

  useEffect(() => {
    getPopular()
  }, [])

  const getMovie = (movie: MovieObject) => {
    setSelectedMovie(movie)
  }

  const getSearchResults = (str: string) => {
    if (str.length > 0) {
      let params = `&language=en-US&query=${str}&page=1`
      getFromApi(`/search/movie`, params)
        .then((data) => {
          let movieData: MovieObject[] = data.results.map( (item: any) => {
            return movieAdapter.adapt(item)
          })
          setSelectedMovie(null)
          setMovies(movieData)
        })
    } else {
      setPageIndex(0)
      getPopular()
    }
  }

  const getPopular = () => {
    let baseImageUrl = process.env.REACT_APP_API_IMAGE_URL

    getFromApi(`/movie/popular`, null)
      .then((data) => {
        let movieData: MovieObject[] = data.results.map( (item: any) => {
          let movieAdapter = new MovieAdapter()
          return movieAdapter.adapt(item)
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
      <SearchBox onSearch={getSearchResults}></SearchBox>
      <h2>Popular Movies</h2>
      <MoviesList data={movies} onClick={ getMovie }></MoviesList>
      <MovieDetails movie={selectedMovie} onBackClick={() => {setSelectedMovie(null)}}></MovieDetails>
    </div>
  );
}

export default App;
