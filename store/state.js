export default () => ({
  library: [],
  filterOptions: {
    datePublishedRangePresetId: [
      { ID: 'anyDate', EN:  'Any', FR: 'Quelconque' },
      { ID: 'thisYear', EN:  currentYear(), FR: currentYear() },
      { ID: 'pastTwoYears', EN:  yearRangeText(2), FR: yearRangeText(2) },
      { ID: 'pastFiveYears', EN:  yearRangeText(5), FR: yearRangeText(5) }
    ]
  },
  issueOptionCategories: {

  },
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

const currentYear = () => {
  let today = new Date();
  return today.getFullYear();
};

const yearRangeText = (delta) => {
  let today = new Date(),
    currentYear = today.getFullYear();
  return `${currentYear - delta} - ${currentYear}`
} 

