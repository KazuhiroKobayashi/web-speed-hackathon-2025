import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  channelId: string;
}

export function useChannelById({ channelId }: Params) {
  const state = useStore((s) => s);

  const channel = state.features.channel.channels[channelId];

  return channel;
}
