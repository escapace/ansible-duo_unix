// @ts-check

import { escapace, compose } from 'eslint-config-escapace'

export default compose(
  escapace(),
  {
    files: [
      'defaults/**/*.{yml,yaml}',
      'handlers/**/*.{yml,yaml}',
      'meta/**/*.{yml,yaml}',
      'molecule/**/*.{yml,yaml}',
      'tasks/**/*.{yml,yaml}',
      'vars/**/*.{yml,yaml}',
    ],
    rules: {
      'yaml/sort-keys': 'off',
    },
  },
  {
    files: ['**/molecule.yml'],
    rules: {
      'yaml/file-extension': 'off',
    },
  },
)
