import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const DIST = 'dist'
const BUNDLE = 'bundle'
const PRODUCTION = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: [
    {
      file: `${DIST}/${BUNDLE}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `${DIST}/${BUNDLE}.esm.js`,
      format: 'esm',
    },
    {
      name: 'butterSlider',
      file: `${DIST}/${BUNDLE}.umd.js`,
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    PRODUCTION && terser(),
  ],
}
