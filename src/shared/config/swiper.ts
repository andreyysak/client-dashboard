import { SwiperOptions } from 'swiper/types'
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules'

export const DefaultSwiperConfig: SwiperOptions = {
  modules: [Navigation, Pagination, Keyboard, Mousewheel, Autoplay],
  spaceBetween: 20,
  slidesPerView: 1,
  centeredSlides: false,
  loop: true,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  navigation: true,
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    },
  },
}

export const AutoplayConfig: SwiperOptions = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
}
