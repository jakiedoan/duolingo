'use client';

import { useEffect, useState } from 'react';

export function useWindowDimension() {
  const [windowDimension, setWindowDimension] = useState<WindowDimension>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize(): void {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimension;
}
