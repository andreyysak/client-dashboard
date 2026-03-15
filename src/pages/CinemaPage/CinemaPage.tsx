import { useEffect } from 'react'
import { useMovies } from '@/entities/movies/api/movieQuery.ts'
import Loader from '@/widgets/Loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import { Autoplay } from 'swiper/modules'
import { Clock, Eye, Heart, Info, Plus, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useDebounce } from '@/shared/hooks/useDebounce.ts'
import { useMoviesStore } from '@/entities/movies/model/movieStore.ts'

const getRatingClass = (vote: number) => {
  if (vote >= 7) return 'high'
  if (vote >= 5) return 'medium'
  return 'low'
}

export const CinemaPage = () => {
  const { t } = useTranslation()
  const {searchQuery, setSearchQuery} = useMoviesStore()

  const debounceSearch = useDebounce(searchQuery, 500)

  const {
    moviesTrending,
    toggleWatchLater,
    favoritesCount,
    watchedCount,
    watchLaterCount,
    moviesByTitle,
  } = useMovies(undefined, debounceSearch)

  useEffect(() => {
    if (moviesTrending.isError) {
      toast.error('Failed to load trending movies')
    }
  }, [moviesTrending.isError])

  if (moviesTrending.isLoading) {
    return <Loader />
  }

  if (!moviesTrending.data) {
    return null
  }

  return (
    <div className="cinema">
      <div className="cinema__topbar">
        <div className="cinema__topbar-input">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t('cinema.search_placeholder')}
          />

          <button
            onClick={() => setSearchQuery('')}
            className={searchQuery.length > 0 ? 'visible' : ''}
          >
            <X />
          </button>
        </div>

        <nav className="cinema__topbar_navbar">
          <ul>
            <li>
              <Link to="/favorites" className="cinema__topbar-link">
                <Heart />
                {favoritesCount > 0 && (
                  <span className="cinema__topbar-badge">{favoritesCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/watched" className="cinema__topbar-link">
                <Eye />
                {watchedCount > 0 && (
                  <span className="cinema__topbar-badge">{watchedCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/watch-later" className="cinema__topbar-link">
                <Clock />
                {watchLaterCount > 0 && (
                  <span className="cinema__topbar-badge">{watchLaterCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {searchQuery && (
        <div className="cinema__results">
          {moviesByTitle.isFetching ? (
            <div className="cinema__results-loader">
              <div className="cinema__results-spinner"></div>
            </div>
          ) : (
            <>
              {moviesByTitle.data && moviesByTitle.data.length > 0 ? (
                <>
                  {moviesByTitle.data.slice(0, 5).map((movie) => (
                    <Link
                      to={`/movie/${movie.id}`}
                      key={movie.id}
                      className="cinema__results-row"
                      onClick={() => setSearchQuery('')}
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
                            : '/placeholder.png'
                        }
                        alt={movie.title}
                      />
                      <div className="cinema__results-info">
                        <h3 className="cinema__results-title">{movie.title}</h3>
                        <p
                          className={`cinema__results-vote cinema__results-vote--${getRatingClass(movie.vote_average)}`}
                        >
                          {movie.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="cinema__results-link">
                    <Link to="/search-results">{t('cinema.search_result')}</Link>
                  </div>
                </>
              ) : (
                <div className="cinema__results-empty">{t('cinema.no_results')}</div>
              )}
            </>
          )}
        </div>
      )}

      <div className="cinema__hero">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          loop={true}
          className="cinema__hero-swiper"
        >
          {moviesTrending.data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="cinema__slide">
                <div className="cinema__slide-image">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className="cinema__slide-backdrop" />
                <div className="cinema__slide-content">
                  <h3 className="cinema__slide-title">{movie.title}</h3>
                  <div
                    className={`cinema__slide-vote cinema__slide-vote--${getRatingClass(movie.vote_average)}`}
                  >
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <p className="cinema__slide-overview">{movie.overview}</p>
                  <div className="cinema__slide-actions">
                    <button
                      onClick={() => toggleWatchLater(movie.id)}
                      className="cinema__slide-btn cinema__slide-btn--primary"
                    >
                      <Plus size={18} />
                      {t('cinema.btn_watch_later')}
                    </button>
                    <button className="cinema__slide-btn cinema__slide-btn--secondary">
                      <Info size={18} />
                      {t('cinema.btn_more_info')}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
