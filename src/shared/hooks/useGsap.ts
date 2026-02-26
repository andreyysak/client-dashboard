import * as React from 'react'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/shared/config/gsap'

export const useGsapContext = (scope: React.RefObject<HTMLElement>) => {
  const ctx = useRef<gsap.Context>(undefined)

  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, scope)
    return () => ctx.current?.revert()
  }, [scope])

  return ctx
}
