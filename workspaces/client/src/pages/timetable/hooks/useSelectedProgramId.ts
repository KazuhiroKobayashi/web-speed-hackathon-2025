import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type Program = z.infer<typeof schema.getTimetableResponse>[number];

export function useSelectedProgramId() {
  const state = useStore((s) => s);
  const setProgram = (program: Program | null) => {
    state.pages.timetable.selectProgram(program);
  };
  return [state.pages.timetable.selectedProgramId, setProgram] as const;
}
