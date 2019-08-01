export default interface MovieObject {
  id: number,
  title: string,
  rating: number,
  date: Date,
  posterUrl: string,
  coverUrl: string,
  overview: string,
  runtime: number
}