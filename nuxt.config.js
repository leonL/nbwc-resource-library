
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'NBWC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap' }
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
    '~/plugins/helpers.js'
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
    '@nuxtjs/markdownit'
  ],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          home: 'Home',
          homeTitle: 'COVID-19 library',
          frAvailable: 'Also available in French',
          language: 'Language',
          geoScopes: 'Geographic Scopes',
          geoScope: 'Geographic Scope',
          contentTypes: 'Types of content',
          issues: 'Issues',
          searchPlaceholder: 'Search by title, author, organization, publication',
          about: 'About',
          aboutTitle: 'About this library'
        },
        fr: {
          home: 'Accueil',
          homeTitle: 'Bibliothèque de COVID-19',
          enAvailable: 'Disponible aussi en anglais',
          language: 'Langue',
          geoScopes: 'Portées géographiques',
          geoScope: 'Portée géographiques',
          contentTypes: 'Types de contenu',
          issues: 'Enjeux',
          searchPlaceholder: 'Recherche par titres, auteurs-es, organisations, publication',
          about: 'À propos',
          aboutTitle: 'À propos de cette bibliothèque'
        }
      }
    }
  },
  markdownit: {
    injected: true
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
