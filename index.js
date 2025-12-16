/* eslint-disable import/no-extraneous-dependencies */
import globals from 'globals'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import importPlugin from 'eslint-plugin-import'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

/**
 * Create ESLint flat config with Vue, TypeScript, and custom rules.
 * @param {Object} options - Configuration options
 * @param {string} [options.tsconfigRootDir] - Root directory for tsconfig resolution (defaults to process.cwd())
 * @returns {import('eslint').Linter.Config[]} ESLint config array
 */
export default function createConfig(options = {}) {
  const { tsconfigRootDir } = options

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const rootDir = tsconfigRootDir || process.cwd()

  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
  })

  const vueFlatConfig = vue.configs['flat/recommended']
  const jsTsFileGlobs = ['**/*.{js,cjs,mjs,ts,mts,cts}']
  const airbnbFlatConfig = compat.extends('airbnb-base').map((config) => ({
    ...config,
    files: config.files || jsTsFileGlobs
  }))
  const tsRecommendedRules = tsPlugin.configs?.recommended?.rules ?? {}

  return [
    {
      ignores: ['jest.config.ts', 'vite.config.*.js']
    },
    js.configs.recommended,
    ...vueFlatConfig,
    ...airbnbFlatConfig,
    {
      plugins: {
        vue,
        'sort-keys-fix': sortKeysFix,
        import: importPlugin
      },

      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.es2022,
          process: 'readonly'
        },

        ecmaVersion: 2022,
        sourceType: 'module'
      },

      rules: {
        'no-prototype-builtins': 'warn',

        indent: ['error', 2, {
          FunctionDeclaration: {
            parameters: 'first'
          },

          FunctionExpression: {
            parameters: 'first'
          },

          CallExpression: {
            arguments: 'first'
          },

          ObjectExpression: 1,
          ArrayExpression: 'first'
        }],

        'linebreak-style': ['error', 'unix'],
        'no-console': 'off',
        'no-debugger': 'warn',

        'no-unused-vars': ['warn', {
          argsIgnorePattern: '^_'
        }],

        camelcase: ['warn', {
          properties: 'never',
          ignoreDestructuring: true
        }],

        'max-len': ['warn', {
          code: 120,
          ignoreComments: true
        }],

        'keyword-spacing': 'warn',
        'space-infix-ops': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'comma-spacing': 'warn',

        'brace-style': ['warn', '1tbs', {
          allowSingleLine: true
        }],

        curly: ['warn', 'multi-line', 'consistent'],

        'no-else-return': ['warn', {
          allowElseIf: false
        }],

        'operator-linebreak': 'warn',
        'block-spacing': 'warn',
        'comma-style': 'error',
        'dot-location': ['warn', 'property'],
        'func-call-spacing': 'error',
        'key-spacing': 'warn',
        'new-cap': 'warn',
        'new-parens': 'warn',
        'no-extra-parens': 'warn',
        'no-floating-decimal': 'warn',
        'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'no-lone-blocks': 'error',
        'no-multi-spaces': 'warn',
        'no-sequences': 'error',
        'no-template-curly-in-string': 'warn',
        'no-trailing-spaces': 'warn',
        'no-unneeded-ternary': 'error',

        'object-curly-newline': ['warn', {
          consistent: true
        }],

        'rest-spread-spacing': 'error',
        'space-before-blocks': 'warn',
        'template-curly-spacing': 'error',

        'vue/valid-v-slot': ['error', {
          allowModifiers: true
        }],

        'vue/component-name-in-template-casing': ['warn', 'kebab-case', {
          registeredComponentsOnly: false
        }],

        'vue/html-indent': ['warn', 2, {
          baseIndent: 0
        }],

        'vue/max-attributes-per-line': ['warn', {
          singleline: 100,
          multiline: 1
        }],

        'vue/no-static-inline-styles': 'warn',
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multi-word-component-names': ['warn', {
          ignores: ['default', 'index']
        }],
        'vue/no-v-text-v-html-on-component': 'off',
        'vue/v-on-handler-style': 'off',

        'vue/eqeqeq': ['warn', 'always', {
          null: 'ignore'
        }],

        'vue/object-curly-spacing': ['error', 'always'],
        'vue/prefer-separate-static-class': 1,
        'vue/require-prop-types': 2,
        'vue/no-restricted-html-elements': ['warn', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

        'vue/no-restricted-syntax': ['warn', {
          selector: '[name=$parent]',
          message: 'Avoid using $parent - use props and emits instead'
        }, {
          selector: '[name=$root]',
          message: 'Avoid using $root - use provide/inject or composables instead'
        }],

        'vue/attributes-order': ['warn', {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'ATTR_SHORTHAND_BOOL',
            'ATTR_DYNAMIC',
            'ATTR_STATIC',
            'CONTENT',
            'EVENTS'
          ],
          alphabetical: false
        }],

        'vue/require-explicit-emits': 'warn',
        'vue/padding-line-between-blocks': ['warn', 'always'],
        'vue/component-api-style': ['error', ['script-setup']],
        'vue/block-lang': ['error', {
          script: { lang: 'ts' }
        }],

        'vue/custom-event-name-casing': ['warn', 'kebab-case', {
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u']
        }],

        'vue/prefer-template': 'warn',

        'no-restricted-syntax': ['warn', {
          selector: '[name=$parent]'
        }, {
          selector: '[name=$root]'
        }, {
          selector: "IfStatement[test.loc.end.column<40] > BlockStatement[body] > :first-child[type='ReturnStatement'][loc.end.column<35][argument.type!='ObjectExpression'][argument.type!='ConditionalExpression'][argument.type!='ArrayExpression'][argument.type!='CallExpression']",
          message: 'Условие выхода из функции без side-эффектов должно быть без { }'
        }, {
          selector: "FunctionExpression > BlockStatement[body] > :last-child[type='IfStatement'][alternate.type='BlockStatement']",
          message: 'Используй return, вместо else'
        }, {
          selector: "UnaryExpression[operator='+']",
          message: 'Запрещено использовать + для приведения к Number - используем Number(), parseInt() или иные явные способы'
        }, {
          selector: "UnaryExpression[operator='!'] > UnaryExpression[operator='!']",
          message: 'Запрещено использовать !! для приведения к Boolean - используем Boolean(something)'
        }, {
          selector: ":matches(IfStatement > MemberExpression[object.name='array'][property.name='length'], IfStatement > LogicalExpression > MemberExpression[object.name='array'][property.name='length'],IfStatement > MemberExpression[object.name='string'][property.name='length'], IfStatement > LogicalExpression > MemberExpression[object.name='string'][property.name='length'])",
          message: "Запрещено использовать if (something.length) для проверки длины массива или строки на '> 0' - используем if (something.length > 0)"
        }, {
          selector: "IfStatement[alternate.type!='BlockStatement'][alternate!='null'][alternate.consequent.type!='BlockStatement']",
          message: 'Запрещено использовать однострочные конструкции с else или else if'
        }],

        semi: ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        radix: ['error', 'as-needed'],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',

        'no-restricted-imports': ['warn', {
          paths: ['lodash']
        }],

        'no-param-reassign': ['warn', {
          props: false
        }],

        'no-underscore-dangle': 'off',

        'global-require': 1,
        'arrow-parens': 1,
        eqeqeq: 1,
        'no-restricted-globals': 1,
        'no-mixed-operators': 1,
        'no-use-before-define': 1,
        'consistent-return': 1,

        'no-shadow': ['warn', {
          allow: ['state']
        }],

        'prefer-destructuring': 1,
        'no-bitwise': 1,
        'no-nested-ternary': 1,
        'no-loop-func': 1,
        'prefer-regex-literals': 1,
        'prefer-const': 1,
        'no-multi-str': 1,
        'default-case': 1,
        'no-unused-expressions': 1,
        'no-plusplus': 1,
        'no-multi-assign': 1,
        'prefer-spread': 1,
        'no-continue': 0,
        'guard-for-in': 1,
        'no-lonely-if': 1,
        'vars-on-top': 1,
        'no-var': 1,
        'import/no-cycle': 1,
        'no-new': 1,
        'class-methods-use-this': 1,
        'max-classes-per-file': 1,
        'no-void': 1,
        'block-scoped-var': 1,
        'import/no-webpack-loader-syntax': 1,
        'no-return-assign': 1,
        'no-await-in-loop': 1,
        'import/no-extraneous-dependencies': 1,
        'default-param-last': 1,
        'no-eval': 1,
        'import/no-mutable-exports': 1,
        'no-promise-executor-return': 1,
        'func-names': 0
      }
    },
    {
      files: ['**/*.vue'],

      languageOptions: {
        parser,
        parserOptions: {
          parser: tsParser,
          tsconfigRootDir: rootDir,
          ecmaVersion: 2022,
          sourceType: 'module',
          extraFileExtensions: ['.vue']
        }
      },

      plugins: {
        '@typescript-eslint': tsPlugin
      },

      rules: {
        ...tsRecommendedRules,
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],

      languageOptions: {
        parser: tsParser,
        parserOptions: {
          tsconfigRootDir: rootDir,
          ecmaVersion: 2022,
          sourceType: 'module'
        }
      },

      plugins: {
        '@typescript-eslint': tsPlugin
      },

      rules: {
        ...tsRecommendedRules,
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
      }
    },
    {
      files: ['**/*.spec.ts', '**/*.test.ts', '**/specs/**/*.ts', '**/*.spec.tsx', '**/*.test.tsx'],

      languageOptions: {
        parser: tsParser,
        parserOptions: {
          tsconfigRootDir: rootDir,
          ecmaVersion: 2022,
          sourceType: 'module'
        },
        globals: {
          ...globals.jest
        }
      },

      plugins: {
        '@typescript-eslint': tsPlugin
      },

      rules: {
        ...tsRecommendedRules,
        '@typescript-eslint/no-explicit-any': 'off',
        'dot-notation': 'off',
        'max-len': ['warn', { code: 140, ignoreComments: true }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'comma-dangle': ['error', 'never'],
        'prefer-destructuring': 'off',
        'func-names': 'off',
        'object-curly-newline': 'off',
        'max-classes-per-file': null
      }
    }
  ]
}
