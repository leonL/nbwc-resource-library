const url = 'https://api.airtable.com/v0/appxlBEhiWnssKkbm';

const defaultSearchParams = [['view', 'ALL RECORDS']]; 

const filterTypeTableNames = { 
  languages: 'LANGUAGES',
  geographicScopes: 'GEOGRAPHIC SCOPES',
  contentTypes: 'CONTENT TYPES',
  issues: 'ISSUES'
};

const resourceFieldNames = {
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
  geographicScope: locale =>  `GEOGRAPHIC SCOPE ${locale}`,
  contentTypes: locale =>  `CONTENT TYPES ${locale}`,
  issues: locale =>  `ISSUES ${locale}`
};

const resourceValidators = {
  hasLanguage: resource => {
    return resource.hasOwnProperty(resourceFieldNames.languageId);
  },
  hasTitle: (resource, langId) => {
    return resource.hasOwnProperty(resourceFieldNames.title(langId));
  },
  hasLink: (resource, langId) => {
    return resource.hasOwnProperty(resourceFieldNames.document(langId)) || resource.hasOwnProperty(resourceFieldNames.link(langId));
  },
  hasPublishedDate: resource => {
    return resource.hasOwnProperty(resourceFieldNames.publicationMonth) && resource.hasOwnProperty(resourceFieldNames.publicationYear); 
  }
}

const isResourcePdf = (resource) => {
  let languageId = resourceFieldParsers.languageId(resource), 
    locale = languageId === 'BOTH' ? 'EN' : languageId,
    documentField = resourceFieldNames.document(locale),
    isDoc = resource.hasOwnProperty(documentField) ? true : false;
  return isDoc;
};

const resourceFieldParsers = {
  languageId: resource => {
    return resource[resourceFieldNames.languageId][0];
  },
  url: (resource, locale) => {
    let languageId = resource[resourceFieldNames.languageId][0],
      url = "";
    if (languageId === 'BOTH' || languageId === locale) {
      let documentField = resourceFieldNames.document(locale),
        linkUrlField = resourceFieldNames.link(locale);
      url = isResourcePdf(resource) ? resource[documentField][0].url : resource[linkUrlField];
    }
    return url;
  },
  organizations: (resource, locale) => {
    let fieldName = resourceFieldNames.organizations(locale),
      organizations = [];
    if (resource.hasOwnProperty(fieldName)) organizations = resource[fieldName];
    return organizations;
  },
  publication: (resource, locale) => {
    let fieldName = resourceFieldNames.publication(locale),
      publication = "";
    if (resource.hasOwnProperty(fieldName)) publication = resource[fieldName][0];
    return publication;
  },
  notes: (resource, locale) => {
    let fieldName = resourceFieldNames.notes(locale),
      notes = "";
  
    if (resource.hasOwnProperty(fieldName)) notes = resource[fieldName];
    return notes;
  },
  geographicScope: (resource, locale) => {
    let fieldName = resourceFieldNames.geographicScope(locale),
      geographicScope = resource[fieldName][0] || "";
  
    return geographicScope;
  },
  contentTypes: (resource, locale) => {
    let fieldName = resourceFieldNames.contentTypes(locale),
      contentTypes = resource[fieldName];
  
    return contentTypes;
  },
  issues: (resource, locale) => {
    let fieldName = resourceFieldNames.issues(locale),
      issues = resource[fieldName];
  
    return issues;
  },
  publicationDay: (resource) => {
    let day = null;
    if (resource.hasOwnProperty(resourceFieldNames.publicationDay)) day = resource[resourceFieldNames.publicationDay];
    return day;
  }
};

export { url, defaultSearchParams, filterTypeTableNames, resourceFieldNames, isResourcePdf, resourceFieldParsers, resourceValidators };