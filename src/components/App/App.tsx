import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import MoviesList from '../MoviesList/MoviesList'
import SearchBox from '../SearchBox/SearchBox'
import MovieDetails from '../MovieDetails/MovieDetails'

import MovieObject from '../../interfaces/MovieObject'
import WindowHistory from '../../interfaces/WindowHistory'

import { getFromApi } from '../../helpers'
import { MediaAdapter } from '../../adapters/index'
import { MediaType } from '../../interfaces/MediaType'

const App: React.FC<{ initial?: MovieObject[] }> = ({ initial = [] }) => {
  
  const [pageIndex, setPageIndex] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [movies, setMovies] = useState(initial);
  const [tv, setTV] = useState(initial);
  const [selectedMedia, setSelectedMedia] = useState<MovieObject | null>(null)

  const movieAdapter = new MediaAdapter(MediaType.Movie)
  const tvAdapter = new MediaAdapter(MediaType.TV)

  // on mount
  useEffect(() => {
    getAllPopular()
    pushHistory()
  }, [])

  // selected movie
  useEffect(() => {
    let history : WindowHistory = window.history.state
    if (history == null) { 
      return
    }

    const oldStateIsNull = selectedMedia === null
    const currentStateIsNull =  history.selectedMovie === null

    if (selectedMedia !== null && history.selectedMovie !== null) {
      if (history.selectedMovie.id !== selectedMedia.id) {
        pushHistory()
      }

    } else if ( !(currentStateIsNull && oldStateIsNull) ) {
      pushHistory()
    }
  }, [selectedMedia])

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

    setSelectedMedia(windowState.selectedMovie)
    setMovies(windowState.movies)
    handleAllSearchResults(windowState.searchValue)
  };

  const handleMediaSelection = (movie: MovieObject | null) => {
    setSelectedMedia(movie)
  }

  const handleSearchChange = (type: MediaType, str: string) => {
    setSearchValue(str)
    if (str.length > 0) {
      let params = `&language=en-US&query=${str}&page=1`
      getFromApi(`/search/${type}`, params)
        .then((data) => {
          switch(type) {
            case MediaType.Movie:
              let movieData: MovieObject[] = data.results.map( (item: any) => {
                return movieAdapter.adapt(item)
              })
              setMovies(movieData)
              break;
            case MediaType.TV:
              let tvData: MovieObject[] = data.results.map( (item: any) => {
                return tvAdapter.adapt(item)
              })
              setTV(tvData)
                
              break;
          }
          setSelectedMedia(null)
        })
    } else {
      setPageIndex(0)
      getAllPopular()
    }
  }

  const getPopular = (type: MediaType) => {
    let baseImageUrl = process.env.REACT_APP_API_IMAGE_URL

    getFromApi(`/${type}/popular`, null)
      .then((data) => {

        switch(type) {
          case MediaType.Movie:
            let movieData: MovieObject[] = data.results.map( (item: any) => {
              return movieAdapter.adapt(item)
            })
            setMovies(movieData)
            break;
          case MediaType.TV:
            let tvData: MovieObject[] = data.results.map( (item: any) => {
              return tvAdapter.adapt(item)
            })
            setTV(tvData)
              
            break;
        }

      })
      .catch(error => {
        console.log("There was an getting popular", type, "media")
      })
  }

  const getAllPopular = () => {
    getPopular(MediaType.Movie)
    getPopular(MediaType.TV)
  }

  const handleAllSearchResults = (str: string) => {
    handleSearchChange(MediaType.Movie, str)
    handleSearchChange(MediaType.TV, str)
  }

  const pushHistory = () => {
    console.log("Push history", selectedMedia ? selectedMedia.title : "")

    let historyStateObj = {
      selectedMovie: selectedMedia,
      movies: movies,
      searchValue: searchValue
    }

    const trimmedTitleRegExp : RegExp = new RegExp(/[^\w\d]+/g)
    let trimmedTitle = selectedMedia !== null ? selectedMedia.title.replace(trimmedTitleRegExp, "") : ""

    window.history.pushState(historyStateObj, "", `${trimmedTitle}`);
  }

  const handleOpenDetailView = () => {
    if (selectedMedia !== null) {
      return "shrunk"
    }
    return ""
  }

  const searchIsOpen = () => {
    if (searchValue.length > 0) {
      return ""
    } 

    return "Popular "
  }

  const searchFailed = () => {
    return (
    <div className="searchFailure">
      <h2>Oh no!</h2>
      <h3>We can't find anything! Try changing your search terms.</h3>
    </div>)
  }

  const mediaLists = () => {
    if (movies.length > 0 && tv.length > 0) {
      return (
        <div>
          <h2 className={ `${handleOpenDetailView()}` }>{`${searchIsOpen()} Movies`}</h2>
          <MoviesList data={ movies } onClick={ handleMediaSelection} className={ handleOpenDetailView() }></MoviesList>
          <h2 className={ `${handleOpenDetailView()}` }>{`${searchIsOpen()} TV`}</h2>
          <MoviesList data={ tv } onClick={ handleMediaSelection} className={ handleOpenDetailView() }></MoviesList>
        </div>
      )
    } else {
      return searchFailed()
    }
  }

  return (
    <div className="App">
      <header className={ handleOpenDetailView() } >
        <img className="logo" src={logo} alt="The Movie DB"></img>
      </header>
      <SearchBox className={ handleOpenDetailView() } onSearch={ handleAllSearchResults } value={searchValue}></SearchBox>
      { mediaLists() }
      <MovieDetails movie={selectedMedia} onBackClick={() => { handleMediaSelection(null) }}></MovieDetails>
    </div>
  );
}

export default App;
