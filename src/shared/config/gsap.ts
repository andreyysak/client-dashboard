import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/dist/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

export const DefaultGsapConfig = {
  duration: {
    fast: 0.3,
    base: 0.5,
    slow: 0.8,
  },
  ease: 'expo.out',
}

export { gsap, ScrollTrigger, Draggable }
