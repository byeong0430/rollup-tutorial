// ROLLUP PLUGINS
// This is the rollup plugin that adds babel as a compilation stage.
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
// This is needed to allow rollup to find modules in the node_modules directory.
import resolve from 'rollup-plugin-node-resolve';
// When importing packages, rollup does its best to figure out
// What is being exported from modules designed for commonjs. This process
// is imperfect and there are times that you need to manually specify what
// symbols should be imported.
import commonjs from 'rollup-plugin-commonjs';
// This is a simple utility plugin that allows you to make changes in the
// output code. Sometimes after all bundling is complete, you need to make some
// final patches to make the code work.
import replace from 'rollup-plugin-replace';
// This is a minification stage. It does some code rewriting. There are
// alternatives, like using closure. But this one seems to work best.
import { uglify } from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import html from 'rollup-plugin-fill-html';

export default {
  // This is the entry point for your script. All the other code that
  // gets included will come from import statements.
  entry: 'src/js/index.js',
  // This is the output file.
  dest: 'build/js/index.min.js',
  // This is the output format. iife is best for web apps meant to run in a
  // browser. iife means that the script is packaged as a self contained self
  // executing function.
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    html({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    scss({
      output: 'build/css/main.css'
    }),
    resolve({ jsnext: true, main: true, browser: true }),
    commonjs({
      // Where to search for modules when you import them. if the
      // module path is not given explicitly, rollup will search
      // for them here.
      include: 'node_modules/**',
      // This is where you patch modules that don't export their symbols cleanly.
      namedExports: {
        './node_modules/react/index.js': [
          'cloneElement',
          'createElement',
          'PropTypes',
          'Children',
          'Component'
        ],
        './node_modules/react-dom/index.js': [
          'render'
        ]
      }
    }),
    eslint({ exclude: ['src/scss/**'] }),
    // Tell babel not to compile stuff out of node_modules. I think this
    // makes the compilation step run faster.
    babel({
      exclude: 'node_modules/**',
      presets: ["es2015-rollup", "react"],
      plugins: ["external-helpers", "transform-decorators-legacy"]
    }),
    // If you don't patch this, the "process" symbol required by react will
    // not be defined. All you need to do here is set that string to either
    // 'development' or 'production' depending on which kind of build you
    // are making.
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ]
};