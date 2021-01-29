const webpack = require('webpack')
require('dotenv').config()

// export default -> module.export 로 변경
module.exports = {
  // mode: 'spa',
  mode: 'universal',
  srcDir: 'client',
  /*
   ** Headers of the page
   */
  head: {
    title: '아람 북클럽',
    meta: [
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge, chrome=1'
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicons/favicon.ico',
        type: 'image/x-icon'
      },

      // Works in Chrome, Safari, IE
      {
        rel: 'icon',
        href: '/favicons/favicon.ico',
        type: 'image/x-icon'
      },

      // Default Sizes
      {
        rel: 'icon',
        href: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      // Apple Devies
      {
        rel: 'apple-touch-icon',
        href: '/favicons/favicon-16x16',
        type: 'image/png'
      }
    ],
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.findIndex%2CArray.from%2CArray.prototype.entries%2CObject.entries',
        body: true
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-YK5119YT9C',
        body: true
      },
      {
        src: '/js/jquery-2.2.4.min.js',
        body: true
      },
      {
        src: '/js/d3.v3.min.js',
        body: true
      }
      // {
      //   src: 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js',
      //   body: true
      // }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~assets/css/reset.scss', lang: 'scss' },
    { src: '~assets/css/index.scss', lang: 'scss' },
    { src: '~assets/css/plugin/swiper.css', lang: 'css' } // VueAwesomeSwiper CSS
  ],
  /*
   ** Style-resources module configuration, 필요한 scss파일에 import해서 사용.
   */
  styleResources: {
    scss: []
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    { src: '~/plugins/vue-fontawesome.js', ssr: true },
    { src: '~/plugins/tui-editor', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: false },
    // { src: '~/plugins/vue-daum-postcode', ssr: false },
    { src: '~/plugins/vue-core-video-player.js', ssr: false },
    { src: '~/plugins/axios', ssr: false }
    // { src: '~/plugins/vue-masonry.js', ssr: false }
  ],
  /*
   ** Auth module configuration
   */
  router: {
    middleware: ['auth', 'route-info']
  },
  auth: {
    redirect: {
      login: false,
      logout: false,
      home: false
    },
    strategies: {
      local: {
        tokenType: 'Bearer',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'result.userToken'
          },
          logout: false,
          user: false
        }
      }
    }
  },
  /*
   ** Google-analytics module configuration
   */
  // googleAnalytics: {
  //   id: process.env.GA_ID || 'UA-135389324-1',
  //   debug: {
  //     enabled: false,
  //     trace: false,
  //     sendHitTask: true, // process.env.NODE_ENV === 'production',
  //   },
  // },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
    // '@nuxtjs/sentry',
    // '@nuxtjs/google-analytics',
    // '@nuxtjs/style-resources',
    // '@nuxtjs/moment',
    // 'nuxt-mq',
    // "nuxt-purgecss"
  ],
  env: {
    SERVER_TYPE: process.env.SERVER_TYPE
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.SERVER_TYPE === 'dev'
        ? process.env.API_DEV
        : process.env.SERVER_TYPE === 'staging'
        ? process.env.API_QA
        : process.env.API_PROD
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
    vendor: ['jspdf'],
    plugins: [new webpack.ProvidePlugin({})],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isDev) {
        // eslint-disable-next-line no-param-reassign
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
