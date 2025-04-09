import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  referenceId: string;
  limit?: number;
}

export function useRecommended({ referenceId }: Params) {
  const moduleIds = useStore((state) => state.features.recommended.references[referenceId]);
  const recommendedModules = useStore((state) => state.features.recommended.recommendedModules);

  const modules = (moduleIds ?? [])
    .map((moduleId) => recommendedModules[moduleId])
    .filter(<T>(m: T): m is NonNullable<T> => m != null);

  return modules;
}
