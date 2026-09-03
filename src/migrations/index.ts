import * as migration_20260903_013506_initial from './20260903_013506_initial';
import * as migration_20260903_110100_refactor_cms_scope from './20260903_110100_refactor_cms_scope';

export const migrations = [
  {
    up: migration_20260903_013506_initial.up,
    down: migration_20260903_013506_initial.down,
    name: '20260903_013506_initial'
  },
  {
    up: migration_20260903_110100_refactor_cms_scope.up,
    down: migration_20260903_110100_refactor_cms_scope.down,
    name: '20260903_110100_refactor_cms_scope'
  },
];
