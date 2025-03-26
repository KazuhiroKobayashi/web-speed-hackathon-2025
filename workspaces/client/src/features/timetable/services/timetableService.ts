import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/timetable': {
      output: schema.getTimetableResponse,
      query: schema.getTimetableRequestQuery,
    },
  }),
  throw: true,
});

interface TimetableService {
  fetchTimetable: (
    params: z.infer<typeof schema.getTimetableRequestQuery>,
  ) => Promise<z.infer<typeof schema.getTimetableResponse>>;
}

export const timetableService: TimetableService = {
  async fetchTimetable({ since, until }) {
    const timetable = await $fetch('/timetable', { query: { since, until } });
    return timetable;
  },
};
