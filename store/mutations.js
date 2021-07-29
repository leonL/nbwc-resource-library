import { isResourcePdf, resourceFieldNames as fields, 
  resourceFieldParsers as parsers, 
  resourceValidators as validators } from "./apiUtilities";
import { defaultFilterValues } from "./resousrceFilterUtilities";

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

    let parsedResources = validResources.map(r => {
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
        geographicScopeId: r[fields.geographicScopeId][0],
        enContentTypes: parsers.contentTypes(r, 'EN'),
        frContentTypes: parsers.contentTypes(r, 'FR'),
        contentTypeIds: r[fields.contentTypeIds],
        enIssues: parsers.issues(r, 'EN'),
        frIssues: parsers.issues(r, 'FR'),
        issueIds: r[fields.issueIds]
      }
    });

    state.library = [...state.library, ...parsedResources];
  },

  setFilterOptions (state, filter) {
    state.filterOptions[filter.type] = filter.options;
  },

  setCopy (state, copy) {
    state.copy = { 
      enSubtitle: copy[0]['HOME:SUBTITLE'],
      frSubtitle: copy[1]['HOME:SUBTITLE'],
      enAboutLibrary: copy[0]['ABOUT:LIBRARY'],
      frAboutLibrary: copy[1]['ABOUT:LIBRARY'],
      enAboutNBWC: copy[0]['ABOUT:NBWC'],
      frAboutNBWC: copy[1]['ABOUT:NBWC'],
      enAboutOpenCall: copy[0]['ABOUT:OPEN CALL'],
      frAboutOpenCall: copy[1]['ABOUT:OPEN CALL']
    }
  },

  setSearchString (state, string) {
    state.filter.searchString = string;
  },

  setLocale (state, locale) {
    state.locale = locale;
  },

  initializeFilters (state) {
    state.filter = {
      ...defaultFilterValues,
      searchString: ""
    }
  },

  setFilter (state, {type, value}) {
    state.filter[type] = value;
  },

  resetFilterValues (state) {
    state.filter = {
    ...defaultFilterValues,  
    searchString: state.filter.searchString
    }
  }
}