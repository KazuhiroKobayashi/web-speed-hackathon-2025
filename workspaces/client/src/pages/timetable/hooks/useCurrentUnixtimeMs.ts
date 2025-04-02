import { useEffect } from 'react';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useCurrentUnixtimeMs(): number {
  const { currentUnixtimeMs, refreshCurrentUnixtimeMs } = useStore((state) => state.pages.timetable);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshCurrentUnixtimeMs();
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentUnixtimeMs;
}
