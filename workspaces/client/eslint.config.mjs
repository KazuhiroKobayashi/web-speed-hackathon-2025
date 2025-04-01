import configs from '@wsh-2025/configs/eslint.config.mjs';

export default [
  ...configs,
  {
    extends: ['@unocss'],
    ignores: ['dist/*', '.wireit/*'],
  },
];
