export default () => ({
  library: [],
  filterOptions: {
    datePublishedRanges: [
      { ID: 'anyDate', EN:  'Any', FR: 'Quelconque' },
      { ID: 'pastMonth', EN:  'Past month', FR: 'Mois passé' },
      { ID: 'pastYear', EN:  'Past Year', FR: "L'année passée" },
      { ID: 'customDateRange', EN:  'Custom date range', FR: 'Plage de dates personnalisée' }
    ]
  },
  filter: {},
  copy: [],
  locale: ''
})