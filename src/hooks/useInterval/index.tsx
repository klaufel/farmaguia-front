import { useEffect, useLayoutEffect, useRef } from 'react';

const useIsomporphicEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function useInterval(
  callback: () => void,
  delay: number | null
) {
  const savedCallback = useRef(callback);

  useIsomporphicEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
