export default () => ({
  library: [],
  filterOptions: {
    datePublishedRangePresetId: [
      { ID: 'anyDate', EN:  'Any', FR: 'Quelconque' },
      { ID: 'pastMonth', EN:  'Past month', FR: 'Mois passé' },
      { ID: 'pastYear', EN:  'Past Year', FR: "L'année passée" },
      { ID: 'customDateRange', EN:  'Custom date range', FR: 'Plage de dates personnalisée' }
    ]
  },
  filter: {},
  searchString: "",
  sortOrderOptions: [
    {id: 0, byField: 'dateAdded', direction: 'asc', en: "date posted (new to old)", fr: "date postée (nouveau à vieux)"},
    {id: 1, byField: 'dateAdded', direction: 'desc', en: "date posted (old to new)", fr: "date postée (ancien au nouveau)"},
    {id: 2, byField: 'datePublished', direction: 'desc', en: "date published (new to old)", fr: "date publiée (nouveau à vieux)"},
    {id: 3, byField: 'datePublished', direction: 'asc', en: "date published (old to new)", fr: "date publiée (ancien au nouveau)"}
  ],
  sortOrderId: 0,
  copy: [],
  locale: ''
})