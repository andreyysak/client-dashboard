export interface MovieUpcoming {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
}

export interface MovieUpcomingResponse {
  success: boolean
  data: MovieUpcoming[]
  statusCode: number
  timestamp: string
}