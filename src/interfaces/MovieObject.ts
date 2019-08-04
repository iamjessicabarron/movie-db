export default interface MovieObject {
  id: number,
  title: string,
  rating: number,
  date: Date,
  posterUrl: string | null,
  coverUrl: string | null,
  overview: string,
}