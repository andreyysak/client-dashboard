import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMoviesStore } from '@/entities/movies/model/movieStore.ts'
import { useDebounce } from '@/shared/hooks/useDebounce.ts'
import { useMovies } from '@/entities/movies/api/movieQuery.ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'

const getRatingClass = (vote: number) => {
  if (vote >= 7) return 'high'
  if (vote >= 5) return 'medium'
  return 'low'
}

export const MoviePage = () => {
  const { t } = useTranslation()
  const { searchQuery, setSearchQuery } = useMoviesStore()
  const debounceSearch = useDebounce(searchQuery, 500)

  const {
    favoritesCount,
    watchedCount,
    watchLaterCount,
    moviesByTitle,
    moviesTrending,
    moviesPopular,
    moviesUpcoming,
  } = useMovies(undefined, debounceSearch)

  if (!moviesTrending.data || !moviesPopular.data || !moviesUpcoming.data) {
    return null
  }

  return (
    <div className="movies">
      <div className="movies__topbar">
        <div className="movies__topbar-input">
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

        <nav className="movies__topbar_navbar">
          <ul>
            <li>
              <Link to="/favorites" className="movies__topbar-link">
                <Heart />
                {favoritesCount > 0 && (
                  <span className="movies__topbar-badge">{favoritesCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/watched" className="movies__topbar-link">
                <Eye />
                {watchedCount > 0 && (
                  <span className="movies__topbar-badge">{watchedCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/watch-later" className="movies__topbar-link">
                <Clock />
                {watchLaterCount > 0 && (
                  <span className="movies__topbar-badge">{watchLaterCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {searchQuery && (
          <div className="movies__results">
            {moviesByTitle.isFetching ? (
              <div className="movies__results-loader">
                <div className="movies__results-spinner"></div>
              </div>
            ) : moviesByTitle.data && moviesByTitle.data.length > 0 ? (
              <>
                {moviesByTitle.data.slice(0, 5).map((movie) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="movies__results-row"
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
                    <div className="movies__results-info">
                      <h3 className="movies__results-title">{movie.title}</h3>
                      <p
                        className={`movies__results-vote movies__results-vote--${getRatingClass(movie.vote_average)}`}
                      >
                        {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </Link>
                ))}
                <div className="movies__results-link">
                  <Link to="/search-results">{t('cinema.search_result')}</Link>
                </div>
              </>
            ) : (
              <div className="movies__results-empty">{t('cinema.no_results')}</div>
            )}
          </div>
        )}
      </div>

      <div className="movies__swiper">
        <h3>{t('cinema.trending_title')}</h3>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {moviesTrending.data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link
                to={`${AppRoutes.CINEMA.ROOT}/${AppRoutes.CINEMA.MOVIE.replace(':id', String(movie.id))}`}
                className="movies__swiper-slide"
              >
                <div className="movies__swiper-image">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className="movies__swiper-content">
                  <h6>{movie.title}</h6>
                  <p>{movie.overview}</p>
                  <div>
                    <p>{movie.release_date}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="movies__swiper">
        <h3>{t('cinema.popular_title')}</h3>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {moviesPopular.data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link
                to={`${AppRoutes.CINEMA.ROOT}/${AppRoutes.CINEMA.MOVIE.replace(':id', String(movie.id))}`}
                className="movies__swiper-slide"
              >
                <div className="movies__swiper-image">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className="movies__swiper-content">
                  <h6>{movie.title}</h6>
                  <p>{movie.overview}</p>
                  <div>
                    <p>{movie.release_date}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="movies__swiper">
        <h3>{t('cinema.upcoming_title')}</h3>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {moviesUpcoming.data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link
                to={`${AppRoutes.CINEMA.ROOT}/${AppRoutes.CINEMA.MOVIE.replace(':id', String(movie.id))}`}
                className="movies__swiper-slide"
              >
                <div className="movies__swiper-image">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className="movies__swiper-content">
                  <h6>{movie.title}</h6>
                  <p>{movie.overview}</p>
                  <div>
                    <p>{movie.release_date}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
