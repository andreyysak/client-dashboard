export interface MovieWatched {
  id: number
  user_id: number
  tmdb_id: number
  created_at: string
}

export interface MovieWatchedResponse {
  statusCode: number
  data: MovieWatched[]
  success: boolean
  timestamp: string
}