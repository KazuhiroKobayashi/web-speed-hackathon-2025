import { createFetch, createSchema } from '@better-fetch/fetch';
import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/channels': {
      output: schema.getChannelsResponse,
    },
    '/channels/:channelId': {
      output: schema.getChannelByIdResponse,
      params: schema.getChannelByIdRequestParams,
    },
  }),
  throw: true,
});

interface ChannelService {
  fetchChannelById: (params: {
    channelId: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getChannelByIdResponse>>;
  fetchChannels: () => Promise<StandardSchemaV1.InferOutput<typeof schema.getChannelsResponse>>;
}

export const channelService: ChannelService = {
  async fetchChannelById({ channelId }) {
    const channel = await $fetch('/channels/:channelId', { params: { channelId } });
    return channel;
  },
  async fetchChannels() {
    const channels = await $fetch('/channels');
    return channels;
  },
};
