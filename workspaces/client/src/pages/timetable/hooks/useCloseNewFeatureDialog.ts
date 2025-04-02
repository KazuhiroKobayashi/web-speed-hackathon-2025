import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useCloseNewFeatureDialog() {
  const closeNewFeatureDialog = useStore((state) => state.pages.timetable.closeNewFeatureDialog);

  return closeNewFeatureDialog;
}
