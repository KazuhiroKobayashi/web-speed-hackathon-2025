import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { episodeService } from '@wsh-2025/client/src/features/episode/services/episodeService';

type EpisodeId = string;

interface EpisodeState {
  episodes: Record<EpisodeId, z.infer<typeof schema.getEpisodeByIdResponse>>;
}

interface EpisodeActions {
  fetchEpisodeById: (params: { episodeId: EpisodeId }) => Promise<z.infer<typeof schema.getEpisodeByIdResponse>>;
  fetchEpisodes: () => Promise<z.infer<typeof schema.getEpisodesResponse>>;
}

export const createEpisodeStoreSlice = () => {
  return lens<EpisodeState & EpisodeActions>((set) => ({
    episodes: {},
    fetchEpisodeById: async ({ episodeId }) => {
      const episode = await episodeService.fetchEpisodeById({ episodeId });
      set((state) => {
        return {
          ...state,
          episodes: {
            ...state.episodes,
            [episode.id]: episode,
          },
        };
      });
      return episode;
    },
    fetchEpisodes: async () => {
      const episodes = await episodeService.fetchEpisodes();
      set((state) => {
        const updatedEpisodes = episodes.reduce(
          (acc, episode) => {
            acc[episode.id] = episode;
            return acc;
          },
          { ...state.episodes },
        );
        return {
          ...state,
          episodes: updatedEpisodes,
        };
      });
      return episodes;
    },
  }));
};
