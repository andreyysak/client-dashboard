import { MovieTrending } from '@/entities/movies/model/MovieTrending.ts'
import { api } from '@/shared/api/axios.ts'
import { MoviePopular } from '@/entities/movies/model/MoviePopular.ts'
import { MovieUpcoming } from '@/entities/movies/model/MovieUpcoming.ts'
import { MovieSearch } from '@/entities/movies/model/MovieSearch.ts'
import { MovieSearchById } from '@/entities/movies/model/MovieSearchById.ts'
import { MovieCastMember } from '@/entities/movies/model/MovieCastMember.ts'
import { MovieFavorite } from '@/entities/movies/model/MovieFavorite.ts'
import { MovieWatched } from '@/entities/movies/model/MovieWatched.ts'
import { MovieWatchLater } from '@/entities/movies/model/MovieWatchLater.ts'

export const MovieApi = {
  async getTrendingMovies(): Promise<MovieTrending[]> {
    const response = await api<MovieTrending[]>('/movies/trending')
    return response.data
  },
  async getPopularMovies(): Promise<MoviePopular[]> {
    const response = await api<MoviePopular[]>('/movies/popular')
    return response.data
  },
  async getUpcomingMovies(): Promise<MovieUpcoming[]> {
    const response = await api<MovieUpcoming[]>('/movies/upcoming')
    return response.data
  },
  async getMoviesByTitleFromTMDB(query: string): Promise<MovieSearch[]> {
    const response = await api<MovieSearch[]>(`/movies/discovery/search?query=${query}`)
    return response.data
  },
  async getMovieByIdFromTMDB(id: number): Promise<MovieSearchById> {
    const response = await api<MovieSearchById>(`/movies/tmdb-details/${id}`)
    return response.data
  },
  async getMovieCastMember(id: number): Promise<MovieCastMember[]> {
    const response = await api<MovieCastMember[]>(`/movies/tmdb-credits/${id}`)
    return response.data
  },
  async getFavoritesMovies(): Promise<MovieFavorite[]> {
    const response = await api<MovieFavorite[]>('/movies/favorites')
    return response.data
  },
  async getWatchedMovies(): Promise<MovieWatched[]> {
    const response = await api<MovieWatched[]>('/movies/watched')
    return response.data
  },
  async getWatchLaterMovies(): Promise<MovieWatchLater[]> {
    const response = await api<MovieWatchLater[]>('/movies/watch-later')
    return response.data
  },
  async toggleFavoriteMovie(id: number): Promise<void> {
    await api.post(`/movies/favorite/${id}`)
  },
  async toggleWatchedMovie(id: number): Promise<void> {
    await api.post(`/movies/watched/${id}`)
  },
  async toggleWatchLaterMovie(id: number): Promise<void> {
    await api.post(`/movies/watch-later/${id}`)
  },
}
