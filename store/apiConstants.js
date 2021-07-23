export default {
  url: 'https://api.airtable.com/v0/appxlBEhiWnssKkbm',
  defaultSearchParams: [['view', 'ALL RECORDS']],
  filterTypeTableNames: { 
    languages: 'LANGUAGES',
    geographicScopes: 'GEOGRAPHIC SCOPES',
    contentTypes: 'CONTENT TYPES',
    issues: 'ISSUES'
  },
  resourceFieldNames: {
    languageId: 'LANGUAGE ID',
    title: locale => `TITLE ${locale}`, 
    document: locale => `DOCUMENT ${locale}`, 
    link: locale => `LINK ${locale}`,
    author: 'AUTHOR',
    organizations: locale => `ORGANIZATIONS ${locale}`,
    publication: locale => `PUBLICATION ${locale}`,
    publicationDay: 'PUBLICATION DAY',
    publicationMonth: 'PUBLICATION MONTH',
    publicationYear: 'PUBLICATION YEAR',
    notes: locale => `NOTES ${locale}`,
  }
}