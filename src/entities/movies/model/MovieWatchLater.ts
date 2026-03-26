export interface MovieWatchLater {
  id: number
  user_id: number
  tmdb_id: number
  created_at: string
}

export interface MovieWatchLaterResponse {
  data: MovieWatchLater[]
  success: boolean
  statusCode: number
  timestamp: string
}