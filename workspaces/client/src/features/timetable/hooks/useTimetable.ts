import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type ChannelId = string;

export function useTimetable() {
  const state = useStore((s) => s);

  const channels = Object.values(state.features.channel.channels);
  const programs = Object.values(state.features.timetable.programs);

  const record = channels.reduce<Record<ChannelId, typeof programs>>((acc, channel) => {
    acc[channel.id] = programs
      .filter((program) => program.channelId === channel.id)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    return acc;
  }, {});

  return record;
}
