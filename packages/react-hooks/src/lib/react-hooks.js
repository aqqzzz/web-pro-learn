import { useRef, useEffect, useCallback } from 'react';

export const useInterval = (fn, delay) => {
  const fnRef = useRef(fn);
  const timerRef = useRef(null);

  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timerRef) {
      clearInterval(timerRef.current)
    }
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => fnRef.current(), delay);
    return cancel;
  }, []);

  return cancel;
}
