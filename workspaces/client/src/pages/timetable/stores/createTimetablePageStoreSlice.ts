import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { DEFAULT_WIDTH } from '@wsh-2025/client/src/features/timetable/constants/grid_size';

type ChannelId = string;
type Program = z.infer<typeof schema.getTimetableResponse>[number];

interface TimetablePageState {
  columnWidthRecord: Record<ChannelId, number>;
  selectedProgram: Program | null;
  shownNewFeatureDialog: boolean;
}

interface TimetablePageActions {
  changeColumnWidth: (params: { channelId: string; delta: number }) => void;
  closeNewFeatureDialog: () => void;
  selectProgram: (program: Program | null) => void;
}

export const createTimetablePageStoreSlice = () => {
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
    selectedProgram: null,
    selectProgram: (program: Program | null) => {
      set(() => ({
        selectedProgram: program ?? null,
      }));
    },
    shownNewFeatureDialog: true,
  }));
};
