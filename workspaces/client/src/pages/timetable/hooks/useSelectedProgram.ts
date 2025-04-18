import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type Program = z.infer<typeof schema.getTimetableResponse>[number];

export function useSelectedProgram() {
  const { selectedProgram, selectProgram } = useStore((state) => state.pages.timetable);
  const setProgram = (program: Program | null) => selectProgram(program);

  return [selectedProgram, setProgram] as const;
}
