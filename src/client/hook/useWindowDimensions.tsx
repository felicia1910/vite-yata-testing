import { useState, useEffect } from 'react';

export type TDimensions = {
  height: number,
  width: number
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<TDimensions>({
    width: 1440,
    height: 900,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
