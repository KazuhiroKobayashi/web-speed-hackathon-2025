import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type ChannelId = string;

export function useTimetable() {
  const channelMap = useStore((state) => state.features.channel.channels);
  const programMap = useStore((state) => state.features.timetable.programs);

  const channels = Object.values(channelMap);
  const programs = Object.values(programMap);

  const record = channels.reduce<Record<ChannelId, typeof programs>>((acc, channel) => {
    acc[channel.id] = programs
      .filter((program) => program.channelId === channel.id)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    return acc;
  }, {});

  return record;
}
