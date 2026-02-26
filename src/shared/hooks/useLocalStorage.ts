import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initial
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initial
    }
  }, [key, initial])

  const [value, setValue] = useState<T>(readValue)

  const setStoredValue = useCallback(
    (val: T | ((prev: T) => T)) => {
      try {
        const valueToStore = val instanceof Function ? val(value) : val
        setValue(valueToStore)
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, value],
  )

  const refresh = useCallback(() => {
    setValue(readValue())
  }, [readValue])

  return [value, setStoredValue, refresh] as const
}
