import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  schema: createSchema({
    '/recommended/:referenceId': {
      output: schema.getRecommendedModulesResponse,
      params: schema.getRecommendedModulesRequestParams,
      query: schema.getRecommendedModulesRequestQuery,
    },
  }),
  throw: true,
});

interface RecommendedService {
  fetchRecommendedModulesByReferenceId: (params: {
    referenceId: string;
    limit: number | undefined;
  }) => Promise<z.infer<typeof schema.getRecommendedModulesResponse>>;
}

export const recommendedService: RecommendedService = {
  async fetchRecommendedModulesByReferenceId({ referenceId, limit }) {
    const recommendedModules = await $fetch('/recommended/:referenceId', {
      params: { referenceId },
      query: { ...(limit !== undefined ? { limit: String(limit) } : {}) },
    });
    return recommendedModules;
  },
};
