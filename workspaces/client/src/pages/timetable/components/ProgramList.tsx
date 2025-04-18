import * as schema from '@wsh-2025/schema/src/api/schema';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { z } from 'zod';

import { HEIGHT_ONE_HOUR } from '@wsh-2025/client/src/features/timetable/constants/grid_size';
import { Gutter } from '@wsh-2025/client/src/pages/timetable/components/Gutter';
import { Program } from '@wsh-2025/client/src/pages/timetable/components/Program';

interface Props {
  channelId: string;
  programList: z.infer<typeof schema.getTimetableResponse>;
  setProgram: (program: z.infer<typeof schema.getTimetableResponse>[number] | null) => void;
}

export const ProgramList = ({ channelId, programList, setProgram }: Props): ReactElement => {
  return (
    <div className="relative">
      <div className="flex flex-col">
        {programList.map((program) => {
          const startAt = DateTime.fromISO(program.startAt);
          const endAt = DateTime.fromISO(program.endAt);
          const duration = endAt.diff(startAt, 'minutes').minutes;
          const height = HEIGHT_ONE_HOUR * (duration / 60);

          return (
            <div
              key={program.id}
              onClick={() => setProgram(program)}
              role="button"
              className="shrink-0 grow-0 cursor-pointer"
            >
              <Program height={height} program={program} />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-y-0 right-[-4px] z-10 w-[8px]">
        <Gutter channelId={channelId} />
      </div>
    </div>
  );
};
