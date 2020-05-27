
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxt/http',
    'nuxt-i18n',
  ],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          intro: 'COVID-19 Resource Library',
          frAvailable: 'French Version',
          frUnavailable: 'No French Version',
          enAvailable: 'English Version',
          enUnavailable: 'No English Version',
          language: 'Language',
          geoScopes: 'Geographic Scopes',
          contentTypes: 'Content Types',
          issues: 'Issues'
        },
        fr: {
          intro: 'Bibliothèque de ressources COVID-19',
          frAvailable: 'Version française',
          frUnavailable: 'Pas de version française',
          enAvailable: 'Version anglaise',
          enUnavailable: 'Pas de version anglaise',
          language: 'Langue',
          geoScopes: 'Portées géographiques',
          contentTypes: 'Types de contenu',
          issues: 'Sujets'
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
