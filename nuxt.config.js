
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
          filters: 'Other Filters',
          publicationYear: 'Publication Year',
          language: 'Language',
          geographicScope: 'Geographic Scope',
          contentTypesFilter: 'Content Type',
          contentTypes: 'Type(s) of content',
          issuesFilter: 'Issue',
          issues: 'Issues',
          about: 'About',
          aboutTitle: 'About this library',
          results: 'results',
          singlePageResults: 'result(s)',
          noResult: 'No results found',
          clearFilters: 'Clear all',
          paywall: 'Paywall',
          nbwcURL: 'https://www.nbwomenscouncil.ca/',
          facebookURL: 'https://www.facebook.com/NBWomensCouncil/',
          twitterURL: 'https://twitter.com/nbwomenscouncil',
          altTextlogo: "New Brunswick Women's Council logo",
          of: 'of',
          from: 'From',
          to: 'To',
          month: 'Month',
          year: 'Year',
          organization: 'Organization',
          published: 'Published'
        },
        fr: {
          home: 'Accueil',
          homeTitle: 'Biblioth??que de ressources',
          enAvailable: 'Disponible aussi en anglais',
          filters: 'Autres filtres',
          publicationYear: 'Ann??e de publication',
          language: 'Langue',
          geographicScope: 'Port??e G??ographique',
          contentTypesFilter: 'Types de contenu',
          contentTypes: 'Type(s) de contenu',
          issuesFilter: 'Enjeu',
          issues: 'Enjeux',
          about: '?? propos',
          aboutTitle: '?? propos de cette biblioth??que',
          results: 'r??sultats',          
          singlePageResults: 'r??sultat(s)',          
          noResult: 'Aucun r??sultat trouv??',
          clearFilters: 'Tout effacer',
          paywall: 'Contenu payant',
          nbwcURL: 'https://www.nbwomenscouncil.ca/content/vnbw-vfnb/fr.html',
          facebookURL: 'https://www.facebook.com/ConseilfemmesNB/?ref=br_rs',
          twitterURL: 'https://twitter.com/conseilfemmesnb',
          altTextlogo: "Logo du Conseil des femmes du Nouveau-Brunswick",
          of: 'de',
          from: 'De',
          to: '??',
          month: 'Mois',
          year: 'An',
          organization: 'Organisation',
          published: 'Publi??'
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
