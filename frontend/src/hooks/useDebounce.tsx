import { useEffect, useRef } from "react";

/**
 * Custom hook to debounce a callback function.
 * @param callback - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @param dependencies - Dependencies for the useEffect.
 */
const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number,
  dependencies: any[] = []
): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...dependencies]);
};

export default useDebouncedCallback;
