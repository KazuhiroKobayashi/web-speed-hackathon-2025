import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useCurrentTime() {
  const { currentTime, updateCurrentTime } = useStore((state) => state.pages.episode);

  const update = (second: number): void => updateCurrentTime(second);

  return [currentTime, update] as const;
}
