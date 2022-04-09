import { useEffect } from 'react';

export type GeneralEventListener = {
 (evt: any): void;
};

export const useEventListener = (
 target: EventTarget,
 event: string,
 listener: GeneralEventListener,
 options?: boolean | AddEventListenerOptions,
) => {
 useEffect(() => {
  target.addEventListener(event, listener, options);
  return () => target.removeEventListener(event, listener, options);
 }, [listener]);
};
