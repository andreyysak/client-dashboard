import { useMemo, useState } from 'react'
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useFloating,
} from '@floating-ui/react'

interface UseFloatingConfigProps {
  placement?: Placement
  offsetValue?: number
  arrowRef?: React.RefObject<HTMLElement>
}

export const useFloatingConfig = ({
  placement = 'bottom',
  offsetValue = 8,
  arrowRef,
}: UseFloatingConfigProps = {}) => {
  const [isOpen, setIsOpen] = useState(false)

  const memoizedMiddleware = useMemo(
    () => [
      offset(offsetValue),
      flip(),
      shift({ padding: 5 }),
      ...(arrowRef ? [arrow({ element: arrowRef })] : []),
    ],
    [offsetValue, arrowRef],
  )

  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: memoizedMiddleware,
  })

  return {
    ...data,
    isOpen,
    setIsOpen,
  }
}
