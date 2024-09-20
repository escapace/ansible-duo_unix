// @ts-check

import { escapace, compose } from 'eslint-config-escapace'

export default compose(
  escapace(),
  {
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
