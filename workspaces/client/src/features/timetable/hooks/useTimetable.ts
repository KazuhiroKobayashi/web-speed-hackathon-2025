import { DateTime } from 'luxon';
import { ArrayValues } from 'type-fest';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type ChannelId = string;

export function useTimetable() {
  const channelMap = useStore((state) => state.features.channel.channels);
  const programMap = useStore((state) => state.features.timetable.programs);

  const channels = Object.values(channelMap);
  const programs = Object.values(programMap);

  const record: Record<ChannelId, ArrayValues<typeof programs>[]> = {};

  for (const channel of channels) {
    const filteredPrograms = [];

    for (const program of programs) {
      if (program.channelId === channel.id) {
        filteredPrograms.push(program);
      }
    }

    record[channel.id] = filteredPrograms.sort((a, b) => {
      return DateTime.fromISO(a.startAt).toMillis() - DateTime.fromISO(b.startAt).toMillis();
    });
  }

  return record;
}
