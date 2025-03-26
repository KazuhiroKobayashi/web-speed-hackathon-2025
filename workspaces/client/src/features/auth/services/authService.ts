import { createFetch, createSchema } from '@better-fetch/fetch';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { z } from 'zod';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/signIn': {
      input: schema.signInRequestBody,
      output: schema.signInResponse,
    },
    '/signOut': {},
    '/signUp': {
      input: schema.signUpRequestBody,
      output: schema.signUpResponse,
    },
    '/users/me': {
      output: schema.getUserResponse,
    },
  }),
  throw: true,
});

interface AuthService {
  fetchSignIn: (body: z.infer<typeof schema.signInRequestBody>) => Promise<z.infer<typeof schema.signInResponse>>;
  fetchSignOut: () => Promise<void>;
  fetchSignUp: (body: z.infer<typeof schema.signUpRequestBody>) => Promise<z.infer<typeof schema.signUpResponse>>;
  fetchUser: () => Promise<z.infer<typeof schema.getUserResponse>>;
}

export const authService: AuthService = {
  async fetchSignIn({ email, password }) {
    const data = await $fetch('/signIn', { body: { email, password }, method: 'POST' });
    return data;
  },
  async fetchSignOut() {
    await $fetch('/signOut', { method: 'POST' });
  },
  async fetchSignUp({ email, password }) {
    const data = await $fetch('/signUp', { body: { email, password }, method: 'POST' });
    return data;
  },
  async fetchUser() {
    const data = await $fetch('/users/me');
    return data;
  },
};
