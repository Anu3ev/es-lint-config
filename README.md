## @anu3ev/eslint-config-fabric

Flat ESLint config that powers the Fabric Image Editor repo. The package bundles the Vue, TypeScript, and custom `no-restricted-syntax` rules you already use in `image-editor`, so the same preset can be reused in other projects or published to npm as-is.

### Installation

```bash
npm install --save-dev \
  eslint@^8.57.1 \
  @anu3ev/eslint-config-fabric \
  @eslint/js \
  @eslint/eslintrc \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-airbnb-base \
  eslint-plugin-import \
  eslint-plugin-sort-keys-fix \
  eslint-plugin-vue \
  globals \
  typescript \
  vue-eslint-parser
```

> **Note**: `eslint-config-airbnb-base@15` only supports ESLint 7/8, so installing the latest ESLint 9 release will trigger `ERESOLVE` errors. Pin ESLint to the latest 8.x version (e.g. `^8.57.1`) or install with `--legacy-peer-deps` if you must keep ESLint 9.

### Usage

```js
// eslint.config.js
import createConfig from '@anu3ev/eslint-config-fabric'

export default createConfig()
```

If your `tsconfig.json` lives elsewhere, pass custom paths:

```js
export default createConfig({
  tsconfigPath: './config/tsconfig.lint.json',
  tsconfigRootDir: new URL('.', import.meta.url).pathname
})
```

This repo already consumes the package locally through a `file:` dependency, so you can run `npm publish` from `packages/eslint-config` whenever you're ready to share it publicly.
