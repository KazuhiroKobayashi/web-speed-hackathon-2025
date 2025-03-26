import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { seriesService } from '@wsh-2025/client/src/features/series/services/seriesService';

type SeriesId = string;

interface SeriesState {
  series: Record<SeriesId, z.infer<typeof schema.getSeriesByIdResponse>>;
}

interface SeriesActions {
  fetchSeries: () => Promise<z.infer<typeof schema.getSeriesResponse>>;
  fetchSeriesById: (params: { seriesId: SeriesId }) => Promise<z.infer<typeof schema.getSeriesByIdResponse>>;
}

export const createSeriesStoreSlice = () => {
  return lens<SeriesState & SeriesActions>((set) => ({
    fetchSeries: async () => {
      const series = await seriesService.fetchSeries();
      set((state) => {
        const updatedSeries = series.reduce(
          (acc, series) => {
            acc[series.id] = series;
            return acc;
          },
          { ...state.series },
        );
        return {
          ...state,
          series: updatedSeries,
        };
      });
      return series;
    },
    fetchSeriesById: async ({ seriesId }) => {
      const series = await seriesService.fetchSeriesById({ seriesId });
      set((state) => {
        return {
          ...state,
          series: {
            ...state.series,
            [series.id]: series,
          },
        };
      });
      return series;
    },
    series: {},
  }));
};
