import { useCallback } from 'react';
import { useEventListener } from './useEventListener';

export const useHandleEscape = <T = any>(cb: () => void | T) => {
 const handleKeyPress = useCallback(
  (e: KeyboardEvent) => {
   if (e.key === 'Escape' || e.key === 'Esc') {
    cb();
   }
  },
  [cb],
 );
 useEventListener(document, 'keydown', handleKeyPress);
};
