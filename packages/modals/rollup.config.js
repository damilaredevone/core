import { builtinModules } from 'module'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
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
  nodeResolve({
    preferBuiltins: true,
  }),
  json(),
  esbuild({
    target: 'node14',
  }),
  typescript({
    outDir: 'dist',
  }),
  postcss({
    config: {
      path: '../../postcss.config.cjs',
      ctx: null,
    },
    inject: {
      insertAt: 'top',
    },
    minimize: true,
    // extract: true,
    extensions: ['css'],
  }),
  terser(),
  babel({ babelHelpers: 'bundled' }),
  copy({
    targets: [
      {
        src: './tailwind.config.js',
        dest: 'dist/',
        rename: 'tailwind-theme.js',
      },
    ],
  }),
]

export default defineConfig([
  {
    input: entries,
    output: {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      chunkFileNames: 'chunk-[name].js',
      sourcemap: true,
    },
    external,
    plugins,
    onwarn,
  },
  {
    input: entries,
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].js',
        sourcemap: true,
      },
    ],
    external,
    plugins: [...plugins, commonjs()],
  },
  {
    input: entries,
    output: {
      dir: 'dist',
      entryFileNames: '[name].d.ts',
      format: 'esm',
    },
    external,
    plugins: [dts({ respectExternal: true })],
    onwarn,
  },
])

function onwarn(message) {
  if (['EMPTY_BUNDLE', 'CIRCULAR_DEPENDENCY'].includes(message.code)) return
  console.error(message)
}
