import { lens } from '@dhmk/zustand-lens';
import { RefCallback } from 'react';

import { PlayerWrapper } from '@wsh-2025/client/src/features/player/interfaces/player_wrapper';

interface EpisodePageState {
  abortController: AbortController | null;
  currentTime: number;
  duration: number;
  muted: boolean;
  player: PlayerWrapper | null;
  playing: boolean;
}

interface EpisodePageActions {
  pause: () => void;
  play: () => void;
  playerRef: RefCallback<PlayerWrapper | null>;
  setMuted: (muted: boolean) => void;
  updateCurrentTime: (second: number) => void;
}

export const createEpisodePageStoreSlice = () => {
  return lens<EpisodePageState & EpisodePageActions>((set, get) => ({
    abortController: null,
    currentTime: 0,
    duration: 0,
    muted: true,
    pause: () => {
      const { player } = get();
      player?.pause();
    },
    play: () => {
      const { player } = get();
      player?.play();
    },
    player: null,
    playerRef: (player: PlayerWrapper | null) => {
      function onMount(player: PlayerWrapper): void {
        const abortController = new AbortController();
        let isUpdating = false;

        player.videoElement.addEventListener(
          'playing',
          () => {
            set({ playing: true });
          },
          { signal: abortController.signal },
        );
        player.videoElement.addEventListener(
          'pause',
          () => {
            set({ playing: false });
          },
          { signal: abortController.signal },
        );

        const updatePlayerState = () => {
          const { currentTime: prevTime, duration: prevDuration } = get();
          const currentTime = player.currentTime;
          const duration = player.duration;

          if (currentTime !== prevTime || duration !== prevDuration) {
            set({ currentTime, duration });
          }

          if (!abortController.signal.aborted) {
            requestAnimationFrame(updatePlayerState);
          }
        };

        requestAnimationFrame(updatePlayerState);

        const observer = new IntersectionObserver(
          (entries) => {
            if (!!entries[0] && entries[0].isIntersecting) {
              if (!isUpdating) {
                isUpdating = true;
                requestAnimationFrame(updatePlayerState);
              }
            } else {
              isUpdating = false;
            }
          },
          { threshold: 0.1 },
        );

        observer.observe(player.videoElement);

        abortController.signal.addEventListener('abort', () => {
          observer.disconnect();
          isUpdating = false;
        });

        set(() => ({
          abortController,
          currentTime: player.currentTime || 0,
          duration: player.duration || 0,
          muted: true,
          player,
          playing: false,
        }));
      }

      function onUnmount(): void {
        const { abortController } = get();

        abortController?.abort();

        set(() => ({
          abortController: null,
          player: null,
        }));
      }

      if (player != null) {
        onMount(player);
      } else {
        onUnmount();
      }
    },
    playing: false,
    setMuted: (muted: boolean) => {
      const { player } = get();
      player?.setMuted(muted);
      set(() => ({ muted }));
    },
    updateCurrentTime: (second) => {
      const { player } = get();
      player?.seekTo(second);
    },
  }));
};
