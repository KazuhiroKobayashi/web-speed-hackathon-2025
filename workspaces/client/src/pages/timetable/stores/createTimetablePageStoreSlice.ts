import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { DEFAULT_WIDTH } from '@wsh-2025/client/src/features/timetable/constants/grid_size';

type ChannelId = string;
type Program = z.infer<typeof schema.getTimetableResponse>[number];

interface TimetablePageState {
  columnWidthRecord: Record<ChannelId, number>;
  currentUnixtimeMs: number;
  selectedProgramId: string | null;
  shownNewFeatureDialog: boolean;
}

interface TimetablePageActions {
  changeColumnWidth: (params: { channelId: string; delta: number }) => void;
  closeNewFeatureDialog: () => void;
  refreshCurrentUnixtimeMs: () => void;
  selectProgram: (program: Program | null) => void;
}

export const createTimetablePageStoreSlice = () => {
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  const debounce = (func: () => void, wait: number) => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(func, wait);
    };
  };

  return lens<TimetablePageState & TimetablePageActions>((set, _get) => ({
    changeColumnWidth: (params: { channelId: string; delta: number }) => {
      set((state) => {
        const current = state.columnWidthRecord[params.channelId] ?? DEFAULT_WIDTH;
        return {
          ...state,
          columnWidthRecord: {
            ...state.columnWidthRecord,
            [params.channelId]: Math.max(current + params.delta, 100),
          },
        };
      });
    },
    closeNewFeatureDialog: () => {
      set(() => ({
        shownNewFeatureDialog: false,
      }));
    },
    columnWidthRecord: {},
    currentUnixtimeMs: 0,
    refreshCurrentUnixtimeMs: debounce(() => {
      set(() => ({
        currentUnixtimeMs: Date.now(),
      }));
    }, 50),
    selectedProgramId: null,
    selectProgram: (program: Program | null) => {
      set(() => ({
        selectedProgramId: program?.id ?? null,
      }));
    },
    shownNewFeatureDialog: true,
  }));
};
