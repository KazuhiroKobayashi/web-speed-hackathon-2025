import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  seriesId: string;
}

export function useSeriesById({ seriesId }: Params) {
  const series = useStore((state) => state.features.series.series[seriesId]);

  return series;
}
