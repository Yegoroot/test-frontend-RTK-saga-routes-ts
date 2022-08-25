import { useEffect, useState } from 'react'
import debaunce from 'lodash.debounce'

function useScrollTrigger(element: {current: HTMLDivElement} | null, loading: boolean): boolean {
  const [debouncedValue, setDebouncedValue] = useState<boolean>(loading)

  const scrollHandler = debaunce(() => {
    const isLessScreenHeight = () => {
      const clientRect = element && element.current?.getBoundingClientRect()
      const elementHeight = (clientRect && clientRect.top + clientRect.height) || 0
      return elementHeight < window.innerHeight
    }

    setDebouncedValue(isLessScreenHeight())
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [scrollHandler])

  return debouncedValue
}

export default useScrollTrigger
