import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import url from '@rollup/plugin-url'
import analyze from 'rollup-plugin-analyzer'
import externals from 'rollup-plugin-node-externals'
import json from '@rollup/plugin-json'

import pkg from './package.json'

export default [
  {
    input: './src/index.ts',
    inlineDynamicImports: true,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['readable-stream', 'readable-stream/transform'],
    plugins: [
      peerDepsExternal(),
      commonjs({
        transformMixedEsModules: true
      }),
      typescript(),
      json(),
      url(),
      externals(),
      resolve(),
      analyze()
    ]
  }
]
