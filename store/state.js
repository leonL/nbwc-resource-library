export default () => ({
  library: [],
  filterOptions: {},
  issueOptionCategories: {},
  filter: {},
  sortOrderOptions: [
    {id: 0, byField: 'datePublished', direction: 'desc', en: "date published (new to old)", fr: "date publiée (nouveau à vieux)"},
    {id: 1, byField: 'datePublished', direction: 'asc', en: "date published (old to new)", fr: "date publiée (ancien au nouveau)"},
    {id: 2, byField: 'dateAdded', direction: 'asc', en: "date posted (new to old)", fr: "date postée (nouveau à vieux)"},
    {id: 3, byField: 'dateAdded', direction: 'desc', en: "date posted (old to new)", fr: "date postée (ancien au nouveau)"}
  ],
  sortOrderId: 0,
  copy: [],
  locale: ''
})

