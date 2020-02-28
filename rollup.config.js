import pkg from './package.json';

export default [
  {
    external: ['path', '@parcel/plugin'],
    input: 'src/Svelte3Transformer.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
