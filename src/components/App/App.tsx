import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'

import MovieObject from '../../interfaces/MovieObject'
import WindowHistory from '../../interfaces/WindowHistory'

import { getFromApi } from '../../helpers'
import { MovieAdapter } from '../../adapters/index'


const App: React.FC<{ initial?: MovieObject[] }> = ({ initial = [] }) => {
  
  const [pageIndex, setPageIndex] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [movies, setMovies] = useState(initial);
  const [selectedMovie, setSelectedMovie] = useState<MovieObject | null>(null)

  const movieAdapter = new MovieAdapter()

  // on mount
  useEffect(() => {
    getPopular()
    pushHistory()
  }, [])

  // selected movie
  useEffect(() => {
    let history : WindowHistory = window.history.state
    if (history == null) { 
      return
    }

    const oldStateIsNull = selectedMovie === null
    const currentStateIsNull =  history.selectedMovie === null

    if (selectedMovie !== null && history.selectedMovie !== null) {
      if (history.selectedMovie.id !== selectedMovie.id) {
        pushHistory()
      }

    } else if ( !(currentStateIsNull && oldStateIsNull) ) {
      pushHistory()
    }
  }, [selectedMovie])

  // search
  useEffect(() => {
    let history : WindowHistory = window.history.state
    if (history == null) { 
      return
    }

    if (searchValue != history.searchValue) {
      pushHistory()
    }
  }, [searchValue])

  window.onpopstate = (event) => {
    let windowState : WindowHistory = event.state

    setSelectedMovie(windowState.selectedMovie)
    setMovies(windowState.movies)
    handleSearchChange (windowState.searchValue)
  };

  const handleMovieSelection = (movie: MovieObject | null) => {
    
    setSelectedMovie(movie)
  }

  const handleSearchChange = (str: string) => {
    setSearchValue(str)
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

  const pushHistory = () => {
    console.log("push history", selectedMovie ? selectedMovie.title : "")

    let historyStateObj = {
      selectedMovie: selectedMovie,
      movies: movies,
      searchValue: searchValue
    }

    const trimmedTitleRegExp : RegExp = new RegExp(/[^\w\d]+/g)
    let trimmedTitle = selectedMovie !== null ? selectedMovie.title.replace(trimmedTitleRegExp, "") : "null"

    window.history.pushState(historyStateObj, "", `${trimmedTitle}`);
  }

  const handleOpenDetailView = () => {
    if (selectedMovie !== null) {
      return "shrunk"
    }
    return ""
  }

  return (
    <div className="App">
      <header className={ handleOpenDetailView() } >
        <img className="logo" src={logo} alt="The Movie DB"></img>
      </header>
      <SearchBox className={ handleOpenDetailView() }onSearch={handleSearchChange} value={searchValue}></SearchBox>
      <h2 className={ handleOpenDetailView() }>Popular Movies</h2>
      <MoviesList data={ movies } onClick={ handleMovieSelection} className={ handleOpenDetailView() }></MoviesList>
      <MovieDetails movie={selectedMovie} onBackClick={() => { handleMovieSelection(null) }}></MovieDetails>
    </div>
  );
}

export default App;
