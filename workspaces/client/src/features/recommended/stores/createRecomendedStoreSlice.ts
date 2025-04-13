import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { recommendedService } from '@wsh-2025/client/src/features/recommended/services/recommendedService';

type ReferenceId = string;
type RecommendedModuleId = string;

interface RecommendedState {
  recommendedModules: Record<RecommendedModuleId, z.infer<typeof schema.getRecommendedModulesResponse>[number]>;
  references: Record<ReferenceId, RecommendedModuleId[]>;
}

interface RecommendedActions {
  fetchRecommendedModulesByReferenceId: (params: {
    referenceId: ReferenceId;
    limit?: number;
  }) => Promise<z.infer<typeof schema.getRecommendedModulesResponse>>;
}

export const createRecommendedStoreSlice = () => {
  return lens<RecommendedState & RecommendedActions>((set) => ({
    fetchRecommendedModulesByReferenceId: async ({ referenceId, limit }) => {
      const modules = await recommendedService.fetchRecommendedModulesByReferenceId({ referenceId, limit });
      set((state) => {
        const updatedModules = modules.reduce(
          (acc, module) => {
            acc[module.id] = module;
            return acc;
          },
          { ...state.recommendedModules },
        );
        return {
          ...state,
          recommendedModules: updatedModules,
          references: {
            ...state.references,
            [referenceId]: modules.map((module) => module.id),
          },
        };
      });
      return modules;
    },
    recommendedModules: {},
    references: {},
  }));
};
