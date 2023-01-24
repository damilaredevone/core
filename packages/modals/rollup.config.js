import { builtinModules } from 'module'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import esbuild from 'rollup-plugin-esbuild'
import { defineConfig } from 'rollup'
import pkg from './package.json'

const entries = {
  index: 'src/index.ts',
}

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const plugins = [
  postcss({
    config: {
      path: '../../postcss.config.cjs',
      ctx: null,
    },
    inject: {
      insertAt: 'top',
    },
    minimize: false,
    extract: true,
    extensions: ['.css'],
  }),
  nodeResolve({
    preferBuiltins: true,
    browser: true,
    mainFields: ['module', 'main'],
  }),
  commonjs(),
  // json(),
  esbuild({
    target: 'node14',
  }),
  typescript({
    tsconfig: './tsconfig.json',
    exclude: ['**/src/stories/**', '**/*.stories.tsx'],
  }),
  // terser(),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
]

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      // {
      //   file: pkg.module,
      //   format: 'iife',
      //   sourcemap: 'inline',
      //   name: 'index',
      // },
    ],
    plugins,
    external,
    onwarn,
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [dts({ respectExternal: true })],
    external: [...external, /\.css$/, /\.scss$/],
    onwarn,
  },
])

function onwarn(message) {
  if (['EMPTY_BUNDLE', 'CIRCULAR_DEPENDENCY'].includes(message.code)) return
  console.error(message)
}
