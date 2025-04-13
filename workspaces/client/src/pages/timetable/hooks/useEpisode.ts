import * as schema from '@wsh-2025/schema/src/api/schema';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { episodeService } from '@wsh-2025/client/src/features/episode/services/episodeService';

type Episode = z.infer<typeof schema.getEpisodeByIdResponse>;

export function useEpisode(episodeId: string) {
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    episodeService
      .fetchEpisodeById({ episodeId })
      .then(setEpisode)
      .catch(() => {
        setEpisode(null);
      });
  }, [episodeId]);

  return episode;
}
