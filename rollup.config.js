import compiler from '@ampproject/rollup-plugin-closure-compiler'
import livereload from 'rollup-plugin-livereload'
import open from 'open'
import serve from 'rollup-plugin-serve'

const isProduction = process.env.npm_lifecycle_event === 'build:production'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/b.js',
    format: 'iife',
  },
  plugins: [
    compiler(),
    !isProduction &&
      serve({
        contentBase: 'dist',
        port: '3030',
      }),
    !isProduction && livereload('dist'),
  ],
}

// NB: rollup-plugin-serve's open option didn't work on WSL2
;(async () => {
  !isProduction && (await open('http://localhost:3030'))
})()
