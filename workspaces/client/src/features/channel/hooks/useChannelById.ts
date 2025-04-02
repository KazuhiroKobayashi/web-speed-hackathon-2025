import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type ChannelId = string;

export function useChannelById(params: { channelId: ChannelId }) {
  const channel = useStore((state) => state.features.channel.channels[params.channelId]);

  return channel;
}
