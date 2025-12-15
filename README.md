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

**Important**: ESLint config file must use `.js` or `.mjs` extension, **not** `.ts`:

```js
// eslint.config.js or eslint.config.mjs
import createConfig from '@anu3ev/eslint-config-fabric'

export default createConfig()
```

> **⚠️ TypeScript config files are not supported**: ESLint 8.x does not natively support `eslint.config.ts`. If you have an `eslint.config.ts` file, rename it to `eslint.config.mjs` or `eslint.config.js`.

If your project root is different from the current working directory:

```js
export default createConfig({
  tsconfigRootDir: new URL('.', import.meta.url).pathname
})
```

> **Note**: The package now uses `projectService` instead of `project` for TypeScript parsing, which automatically supports TypeScript project references.

### Troubleshooting

**Error: "No files matching the pattern '.' were found"**

This usually means:
1. Your config file is named `eslint.config.ts` instead of `.js`/`.mjs` → Rename it to `eslint.config.mjs`
2. Your config file is in the wrong location → Make sure it's in the project root
3. ESLint is not finding the config → Try running `npx eslint --debug .` to see what's happening

This repo already consumes the package locally through a `file:` dependency, so you can run `npm publish` from `packages/eslint-config` whenever you're ready to share it publicly.
