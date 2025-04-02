import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useMuted() {
  const { muted, setMuted } = useStore((state) => state.pages.episode);
  const toggleMuted = () => setMuted(!muted);

  return [muted, toggleMuted] as const;
}
