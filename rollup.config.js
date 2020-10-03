import { dependencies } from './package.json';

export default {
  input: 'index.js',
  external: ['util', 'postcss', ...Object.keys(dependencies)],

  output: [
    {
      file: 'index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },

    { file: 'index.es.mjs', format: 'es', sourcemap: true },
  ],
};
