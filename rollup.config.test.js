export default [
  {
    input: 'src/ecs.js',
    output: {
      file: 'dist/ecs.cjs.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/util.js',
    output: {
      file: 'dist/util.cjs.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/world.js',
    output: {
      file: 'dist/world.cjs.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/rng.js',
    output: {
      file: 'dist/rng.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
  },
  {
    input: 'src/rgb-256.js',
    output: {
      file: 'dist/rgb-256.cjs.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/shapes/constants.js',
    output: {
      file: 'dist/constants.shapes.cjs.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/shapes/factory.js',
    output: {
      file: 'dist/shapes.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
  },
]
