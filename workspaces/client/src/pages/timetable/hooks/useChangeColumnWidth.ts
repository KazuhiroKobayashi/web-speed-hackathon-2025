import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useChangeColumnWidth() {
  const changeColumnWidth = useStore((state) => state.pages.timetable.changeColumnWidth);

  return changeColumnWidth;
}
