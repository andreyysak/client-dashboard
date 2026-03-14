import { useEffect } from 'react'
import { useMovies } from '@/entities/movies/api/movieQuery.ts'
import Loader from '@/widgets/Loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import { Autoplay } from 'swiper/modules'
import { Clock, Eye, Heart, Info, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const getRatingClass = (vote: number) => {
  if (vote >= 7) return 'high'
  if (vote >= 5) return 'medium'
  return 'low'
}

export const CinemaPage = () => {
  const {t} = useTranslation()
  const { moviesTrending, toggleWatchLater } = useMovies()

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
          <input type="text" placeholder={t('cinema.search_placeholder')} />
        </div>

        <nav className="cinema__topbar_navbar">
          <ul>
            <li>
              <Link to="/favorites">
                <Heart />
              </Link>
            </li>
            <li>
              <Link to="/watched">
                <Eye />
              </Link>
            </li>
            <li>
              <Link to="/watch-later">
                <Clock />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

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
                    <button onClick={() => toggleWatchLater(movie.id)} className="cinema__slide-btn cinema__slide-btn--primary">
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
