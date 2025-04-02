import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useDuration() {
  const duration = useStore((state) => state.pages.episode.duration);

  return duration;
}
