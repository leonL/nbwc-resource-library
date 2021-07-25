import { isResourcePdf, resourceFieldNames as fields, 
  resourceFieldParsers as parsers, 
  resourceValidators as validators } from "./apiUtilities";

export default {
  addResourcesToLibrary (state, resources) {

    let validResources = resources.filter(r => {
      let isValid = true;

      if (!validators.hasPublishedDate(r)) return isValid = false;

      if (validators.hasLanguage(r)) {
        let languageId = parsers.languageId(r);

        if (languageId === 'BOTH') {
          isValid = validators.hasTitle(r, "EN") && validators.hasLink(r, "EN") && validators.hasTitle(r, "FR") && validators.hasLink(r, "FR");
        } else {
          isValid = validators.hasTitle(r, languageId) && validators.hasLink(r, languageId);
        }

      } else {
        return isValid = false;
      }
      return isValid;
    });

    let transformedResources = validResources.map(r => {
      return {
        languageId: parsers.languageId(r),
        isPdf: isResourcePdf(r),
        enTitle: r[fields.title('EN')],
        enUrl: parsers.url(r, 'EN'),
        frTitle: r[fields.title('FR')],
        frUrl: parsers.url(r, 'FR'),
        author: r[fields.author] || "",
        enOrganizations: parsers.organizations(r, 'EN'),
        frOrganizations: parsers.organizations(r, 'FR'),
        enPublication: parsers.publication(r, 'EN'),
        frPublication: parsers.publication(r, 'FR'),
        publicationYear: r[fields.publicationYear],
        publicationMonth: r[fields.publicationMonth] - 1,
        publicationDay: parsers.publicationDay(r),
        enNotes: parsers.notes(r, 'EN'),
        frNotes: parsers.notes(r, 'FR'),
        enGeographicScope: parsers.geographicScope(r, 'EN'),
        frGeographicScope: parsers.geographicScope(r, 'FR'),
        enContentTypes: parsers.contentTypes(r, 'EN'),
        frContentTypes: parsers.contentTypes(r, 'FR'),
        enIssues: parsers.issues(r, 'EN'),
        frIssues: parsers.issues(r, 'FR')
      }
    });

    state.library = [...state.library, ...transformedResources];

  },
  setFilterOptions (state, filter) {
    state.filterOptions[filter.type] = filter.options;
  },
  setCopy (state, copy) {
    state.copy = copy;
  },
  setSearchString (state, string) {
    state.filters.searchString = string;
  },
  setLocale (state, locale) {
    state.locale = locale;
  }
}