import escapace from 'prettier-config-escapace' with { type: 'json' }

export default {
  ...escapace,
  overrides: [
    ...(escapace.overrides || []),
    {
      files: [
        'defaults/**/*.{yml,yaml}',
        'handlers/**/*.{yml,yaml}',
        'meta/**/*.{yml,yaml}',
        'molecule/**/*.{yml,yaml}',
        'tasks/**/*.{yml,yaml}',
        'vars/**/*.{yml,yaml}',
      ],
      options: {
        singleQuote: false,
      },
    },
  ],
}
