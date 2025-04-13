import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  channelId: string;
}

export function useChannelById({ channelId }: Params) {
  const channel = useStore((state) => state.features.channel.channels[channelId]);

  return channel;
}
