# parcel-transformer-svelte3

A Parcel 2 transformer for Svelte 3.

## Installation

you should configure in `.parcelrc` the transformation for Svelte files:

```json
{
  "extends": ["@parcel/config-default"],
  "transforms": {
    "*.svelte": ["parcel-transformer-svelte3"]
  }
}
```
## Configuration

You can change Svelte options though a `.svelterc`, `svelte.config.js` file .

```js
// Options used by svelte.compile
compiler: {
  ...
},
// Preprocessors for svelte.preprocess
preprocessors: {
  ...
}
```



