import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type Program = z.infer<typeof schema.getTimetableResponse>[number];

export function useSelectedProgramId() {
  const { selectedProgramId, selectProgram } = useStore((state) => state.pages.timetable);
  const setProgram = (program: Program | null) => selectProgram(program);

  return [selectedProgramId, setProgram] as const;
}
