import * as migration_20260903_013506_initial from './20260903_013506_initial';

export const migrations = [
  {
    up: migration_20260903_013506_initial.up,
    down: migration_20260903_013506_initial.down,
    name: '20260903_013506_initial'
  },
];
