import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  schema: createSchema({
    '/programs': {
      output: schema.getProgramsResponse,
    },
    '/programs/:programId': {
      output: schema.getProgramByIdResponse,
      params: schema.getProgramByIdRequestParams,
    },
  }),
  throw: true,
});

interface ProgramService {
  fetchProgramById: (params: { programId: string }) => Promise<z.infer<typeof schema.getProgramByIdResponse>>;
  fetchPrograms: () => Promise<z.infer<typeof schema.getProgramsResponse>>;
}

export const programService: ProgramService = {
  async fetchProgramById({ programId }) {
    const program = await $fetch('/programs/:programId', { params: { programId } });
    return program;
  },
  async fetchPrograms() {
    const programs = await $fetch('/programs');
    return programs;
  },
};
