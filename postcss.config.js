const MOBILE_DESIGN_WIDTH = 750
const DESKTOP_DESIGN_WIDTH = 1440

function mpx(value) {
  return `calc(${value} / 750 * 100 * var(--vwpx))`;
}
function dpx(value) {
  return `calc(${value} / 1280 * 100 * var(--vwpx))`;
}
function wpx(value) {
  return `${value}px`;
}

module.exports = {
  plugins: {
    // FUNCTION
    'postcss-atroot': {},
    'postcss-mixins': {},
    'postcss-easy-import': {
      extensions: ['.css', '.pcss']
    },
    // NOTE: nuxtコンフィグ直下のcssや'postcss-preset-env'の importFromではpostcssが機能しなくなった
    // https://github.com/csstools/postcss-plugins/issues/834#issuecomment-1420930438
    '@csstools/postcss-global-data': {
      files: [
        './src/_config.pcss'
      ]
    },
    'postcss-preset-env': {
      // preserve: false,
      /**
       * NOTE: FEATUREリスト
       * https://preset-env.cssdb.org/features/
       * */
      features: {
        // NOTE: Avoid error on nuxt3 
        // これが原因でビルド失敗する。使わないので一旦無効に
        'gradients-interpolation-method': false,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'nesting-rules': true,
      }
    },

    // CALCURATE & CLEAN UP
    'postcss-functions': {
      functions: {
        mpx, 
        dpx,
        wpx,
      }
    },
    'postcss-calc': {
      // preserve: false,
    },
    'autoprefixer': {
      // FIXME - ちゃんと効いてるかチェックしてない
    },

    // SORT
    // NOTE: mqpacker利用前提の https://github.com/dutchenkoOleg/sort-css-media-queries をpostcssで直接使えるようラップしたのが https://github.com/yunusga/postcss-sort-media-queries
    'postcss-sort-media-queries': {},
    'cssnano': {
      preset: [
        'default',
        {
          minifyFontValues: {
            removeQuotes: false,
          },
        }
      ]
    },
  },
}
