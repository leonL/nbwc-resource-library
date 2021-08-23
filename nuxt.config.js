
export default {
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    title: 'NBWC Resource Library',
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
    '~/plugins/helpers.js',
    { src: '~/plugins/i18n.js' }
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
      'ButtonPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'CollapsePlugin',
      'FormSelectPlugin',
      'PaginationPlugin',
      'IconsPlugin',
      'DropdownPlugin'
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
          homeTitle: 'Resource library',
          frAvailable: 'Also available in French',
          filters: 'Filters',
          publicationYear: 'Publication Year',
          language: 'Language',
          geographicScope: 'Geographic Scope',
          contentTypesFilter: 'Content Type',
          contentTypes: 'Type(s) of content',
          issuesFilter: 'Issue',
          issues: 'Issue(s)',
          about: 'About',
          aboutTitle: 'About this library',
          results: 'results',
          singlePageResults: 'result(s)',
          noResult: 'No results found',
          clearFilters: 'Clear all filters',
          paywall: 'Paywall',
          nbwcURL: 'https://www.nbwomenscouncil.ca/',
          facebookURL: 'https://www.facebook.com/NBWomensCouncil/',
          twitterURL: 'https://twitter.com/nbwomenscouncil',
          altTextlogo: "New Brunswick Women's Council logo",
          of: 'of',
          from: 'From',
          to: 'To',
          month: 'Month',
          year: 'Year'
        },
        fr: {
          home: 'Accueil',
          homeTitle: 'Bibliothèque de ressources',
          enAvailable: 'Disponible aussi en anglais',
          filters: 'Filtres',
          publicationYear: 'Année de publication',
          language: 'Langue',
          geographicScope: 'Portée Géographique',
          contentTypesFilter: 'Types de contenu',
          contentTypes: 'Type(s) de contenu',
          issuesFilter: 'Enjeu',
          issues: 'Enjeu(x)',
          about: 'À propos',
          aboutTitle: 'À propos de cette bibliothèque',
          results: 'résultats',          
          singlePageResults: 'résultat(s)',          
          noResult: 'Aucun résultat trouvé',
          clearFilters: 'Effacer tous les filtres',
          paywall: 'Contenu payant',
          nbwcURL: 'https://www.nbwomenscouncil.ca/content/vnbw-vfnb/fr.html',
          facebookURL: 'https://www.facebook.com/ConseilfemmesNB/?ref=br_rs',
          twitterURL: 'https://twitter.com/conseilfemmesnb',
          altTextlogo: "Logo du Conseil des femmes du Nouveau-Brunswick",
          of: 'de',
          from: 'De',
          to: 'À',
          month: 'Mois',
          year: 'An'
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
  }
}
