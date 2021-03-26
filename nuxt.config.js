
export default {
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
  bootstrapVue: {
    componentPlugins: [
      'DropdownPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'CollapsePlugin'
    ],
    components: ['BIconList']
  },
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
          geoScopesFilter: 'Geographic Scopes',
          geoScope: 'Geographic scope',
          contentTypesFilter: 'Types of content',
          contentTypes: 'Type(s) of content',
          issuesFilter: 'Issues',
          issues: 'Issue(s)',
          searchPlaceholder: 'Search by title, author, organization, publication',
          about: 'About',
          aboutTitle: 'About this library',
          resultsShowing: 'results showing',
          clearFilters: 'Clear Filters',
          paywall: 'Paywall',
          nbwcURL: 'https://www.nbwomenscouncil.ca/',
          facebookURL: 'https://www.facebook.com/NBWomensCouncil/',
          twitterURL: 'https://twitter.com/nbwomenscouncil',
          altTextlogo: "New Brunswick Women's Council logo"
        },
        fr: {
          home: 'Accueil',
          homeTitle: 'Bibliothèque sur la COVID-19',
          enAvailable: 'Disponible aussi en anglais',
          language: 'Langue',
          geoScopesFilter: 'Portées géographiques',
          geoScope: 'Portée géographique',
          contentTypesFilter: 'Types de contenu',
          contentTypes: 'Type(s) de contenu',
          issuesFilter: 'Enjeux',
          issues: 'Enjeu(x)',
          searchPlaceholder: 'Recherche par titres, auteurs-es, organisations, publication',
          about: 'À propos',
          aboutTitle: 'À propos de cette bibliothèque',
          resultsShowing: 'résultats obtenus',          
          clearFilters: 'Effacer les filtres',
          paywall: 'Contenu payant',
          nbwcURL: 'https://www.nbwomenscouncil.ca/content/vnbw-vfnb/fr.html',
          facebookURL: 'https://www.facebook.com/ConseilfemmesNB/?ref=br_rs',
          twitterURL: 'https://twitter.com/conseilfemmesnb',
          altTextlogo: "Logo du Conseil des femmes du Nouveau-Brunswick"
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
    },
    extractCSS: true
  },
  router: {
    middleware: 'redirect-heroku-url'
  }
}
