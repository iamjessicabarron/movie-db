import MovieObject from './MovieObject'

export default interface WindowHistory {
  selectedMovie: MovieObject | null
  movies: MovieObject[]
  searchValue: string
}