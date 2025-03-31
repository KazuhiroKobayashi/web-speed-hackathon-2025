import { createFetch, createSchema } from '@better-fetch/fetch';
import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';

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
  fetchSeries: () => Promise<StandardSchemaV1.InferOutput<typeof schema.getSeriesResponse>>;
  fetchSeriesById: (params: {
    seriesId: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getSeriesByIdResponse>>;
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
