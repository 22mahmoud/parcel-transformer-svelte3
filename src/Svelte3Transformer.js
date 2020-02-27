import path from 'path';
import { Transformer } from '@parcel/plugin';

function sanitize(input) {
  return path
    .basename(input)
    .replace(path.extname(input), '')
    .replace(/[^a-zA-Z_$0-9]+/g, '_')
    .replace(/^_/, '')
    .replace(/_$/, '')
    .replace(/^(\d)/, '_$1');
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export default new Transformer({
  async loadConfig({ config, options }) {
    const customOptions = await config.getConfig([
      '.svelterc',
      'svelte.config.js',
    ]);
    const compiler = {
      css: false,
      ...customOptions.compiler,
      filename: config.searchPath,
      name: capitalize(sanitize(config.searchPath)),
      dev: options.mode !== 'producation',
    };
    const preprocessors = customOptions.preprocessors;
    config.setResult({
      compiler,
      preprocessors,
    });
  },

  async transform({ asset, config, options }) {
    if (!config) {
      return [asset];
    }

    let code = await asset.getCode();
    const { compile, preprocess } = await options.packageManager.require(
      'svelte/compiler.js',
      asset.filePath,
    );

    if (config.preprocessors) {
      const preprocessed = await preprocess(
        code,
        config.preprocess,
        config.compiler,
      );

      code = preprocessed;
    }

    const { js, css } = compile(code.toString(), config.compiler);

    return [
      {
        type: 'js',
        code: js.code,
      },
      /* eslint-disable */
      css &&
        css.code && {
          type: 'css',
          code: css.code,
        },
    ].filter(Boolean);
    /* eslint-enable */
  },
});
