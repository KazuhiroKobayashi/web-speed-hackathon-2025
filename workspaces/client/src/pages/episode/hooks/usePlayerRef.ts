import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function usePlayerRef() {
  const playerRef = useStore((state) => state.pages.episode.playerRef);

  return playerRef;
}
