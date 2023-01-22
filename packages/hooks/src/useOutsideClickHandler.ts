import React, { useEffect } from 'react'
import { useEventListener } from './useEventListener'

export const useClickOutsideHandler = (
  ref: React.RefObject<any>,
  callback: (event: MouseEvent | TouchEvent) => any,
): void => {
  const callbackFnRef = React.useRef(callback)

  const handler = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callbackFnRef.current?.(event)
    }
  }

  useEventListener(document, 'mouseup', handler)
  useEventListener(document, 'touchend', handler)

  useEffect(() => {
    callbackFnRef.current = callback
  }, [callback])
}
