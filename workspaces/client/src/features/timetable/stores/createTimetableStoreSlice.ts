import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { timetableService } from '@wsh-2025/client/src/features/timetable/services/timetableService';

type ProgramId = string;

interface TimetableState {
  programs: Record<ProgramId, z.infer<typeof schema.getTimetableResponse>[number]>;
}

interface TimetableActions {
  fetchTimetable: (params: { since: string; until: string }) => Promise<z.infer<typeof schema.getTimetableResponse>>;
}

export const createTimetableStoreSlice = () => {
  return lens<TimetableState & TimetableActions>((set) => ({
    fetchTimetable: async ({ since, until }) => {
      const programs = await timetableService.fetchTimetable({ since, until });
      set((state) => {
        const updatedPrograms = programs.reduce(
          (acc, program) => {
            acc[program.id] = program;
            return acc;
          },
          { ...state.programs },
        );
        return {
          ...state,
          programs: updatedPrograms,
        };
      });
      return programs;
    },
    programs: {},
  }));
};
