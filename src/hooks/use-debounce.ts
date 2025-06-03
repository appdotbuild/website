import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// function debounce<T extends (...args: Parameters<T>) => void>(func: T, wait: number): T {
//     let timeout: ReturnType<typeof setTimeout> | null = null;

//     return ((...args: Parameters<T>) => {
//       const later = () => {
//         timeout = null;
//         func(...args);
//       };
//       if (timeout !== null) {
//         clearTimeout(timeout);
//       }
//       timeout = setTimeout(later, wait);
//     }) as T;
//   }
