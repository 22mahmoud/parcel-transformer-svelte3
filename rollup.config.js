import pkg from './package.json';

export default [
  {
    input: 'src/Svelte3Transformer.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
