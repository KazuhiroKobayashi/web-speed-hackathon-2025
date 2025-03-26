import { lens } from '@dhmk/zustand-lens';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { channelService } from '@wsh-2025/client/src/features/channel/services/channelService';

type ChannelId = string;

interface ChannelState {
  channels: Record<ChannelId, z.infer<typeof schema.getChannelByIdResponse>>;
}

interface ChannelActions {
  fetchChannelById: (params: { channelId: ChannelId }) => Promise<z.infer<typeof schema.getChannelByIdResponse>>;
  fetchChannels: () => Promise<z.infer<typeof schema.getChannelsResponse>>;
}

export const createChannelStoreSlice = () => {
  return lens<ChannelState & ChannelActions>((set) => ({
    channels: {},
    fetchChannelById: async ({ channelId }) => {
      const channel = await channelService.fetchChannelById({ channelId });
      set((state) => {
        return {
          ...state,
          channels: {
            ...state.channels,
            [channel.id]: channel,
          },
        };
      });
      return channel;
    },
    fetchChannels: async () => {
      const channels = await channelService.fetchChannels();
      set((state) => {
        const updatedChannels = channels.reduce(
          (acc, channel) => {
            acc[channel.id] = channel;
            return acc;
          },
          { ...state.channels },
        );
        return {
          ...state,
          channels: updatedChannels,
        };
      });
      return channels;
    },
  }));
};
