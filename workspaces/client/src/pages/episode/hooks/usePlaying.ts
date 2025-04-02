import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function usePlaying() {
  const { playing, play, pause } = useStore((state) => state.pages.episode);
  const toggle = (): void => (playing ? pause() : play());

  return [playing, toggle] as const;
}
