import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { programService } from '@wsh-2025/client/src/features/program/services/programService';

type ProgramId = string;

interface ProgramState {
  programs: Record<ProgramId, z.infer<typeof schema.getProgramByIdResponse>>;
}

interface ProgramActions {
  fetchProgramById: (params: { programId: ProgramId }) => Promise<z.infer<typeof schema.getProgramByIdResponse>>;
  fetchPrograms: () => Promise<z.infer<typeof schema.getProgramsResponse>>;
}

export const createProgramStoreSlice = () => {
  return lens<ProgramState & ProgramActions>((set) => ({
    fetchProgramById: async ({ programId }) => {
      const program = await programService.fetchProgramById({ programId });
      set((state) => {
        return {
          ...state,
          programs: {
            ...state.programs,
            [program.id]: program,
          },
        };
      });
      return program;
    },
    fetchPrograms: async () => {
      const programs = await programService.fetchPrograms();
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
