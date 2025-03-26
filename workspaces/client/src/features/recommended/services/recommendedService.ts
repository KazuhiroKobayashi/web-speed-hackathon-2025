import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/recommended/:referenceId': {
      output: schema.getRecommendedModulesResponse,
      params: schema.getRecommendedModulesRequestParams,
    },
  }),
  throw: true,
});

interface RecommendedService {
  fetchRecommendedModulesByReferenceId: (params: {
    referenceId: string;
  }) => Promise<z.infer<typeof schema.getRecommendedModulesResponse>>;
}

export const recommendedService: RecommendedService = {
  async fetchRecommendedModulesByReferenceId({ referenceId }) {
    const modules = await $fetch('/recommended/:referenceId', { params: { referenceId } });
    return modules;
  },
};
