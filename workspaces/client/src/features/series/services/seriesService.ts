import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/series': {
      output: schema.getSeriesResponse,
    },
    '/series/:seriesId': {
      output: schema.getSeriesByIdResponse,
      params: schema.getSeriesByIdRequestParams,
    },
  }),
  throw: true,
});

interface SeriesService {
  fetchSeries: () => Promise<z.infer<typeof schema.getSeriesResponse>>;
  fetchSeriesById: (params: { seriesId: string }) => Promise<z.infer<typeof schema.getSeriesByIdResponse>>;
}

export const seriesService: SeriesService = {
  async fetchSeries() {
    const series = await $fetch('/series');
    return series;
  },
  async fetchSeriesById({ seriesId }) {
    const series = await $fetch('/series/:seriesId', { params: { seriesId } });
    return series;
  },
};
