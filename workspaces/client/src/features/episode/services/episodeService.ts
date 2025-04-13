import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  schema: createSchema({
    '/episodes': {
      output: schema.getEpisodesResponse,
    },
    '/episodes/:episodeId': {
      output: schema.getEpisodeByIdResponse,
      params: schema.getEpisodeByIdRequestParams,
    },
  }),
  throw: true,
});

interface EpisodeService {
  fetchEpisodeById: (params: { episodeId: string }) => Promise<z.infer<typeof schema.getEpisodeByIdResponse>>;
  fetchEpisodes: () => Promise<z.infer<typeof schema.getEpisodesResponse>>;
}

export const episodeService: EpisodeService = {
  async fetchEpisodeById({ episodeId }) {
    const episode = await $fetch('/episodes/:episodeId', { params: { episodeId } });
    return episode;
  },
  async fetchEpisodes() {
    const episodes = await $fetch('/episodes');
    return episodes;
  },
};
