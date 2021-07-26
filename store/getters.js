import { removeDiacritics } from "~/plugins/helpers"; 
import * as filters from "./resousrceFilterUtilities";

export default {
  resources: (state, {filter, locale, searchRegExp}) => {
    let resources = state.library.map(resource => ({...resource}));

    resources = filters.filterByDatePublished(resources, filter);
    resources = filters.filterByLanguage(resources, filter);
    resources = filters.filterByGeographicScope(resources, filter);
    resources = filters.filterByContentType(resources, filter);
    resources = filters.filterByIssue(resources, filter);
    resources = filters.filterBySearchString(resources, filter, searchRegExp, locale);

    return resources;
  },

  filterOptions: state => {
    return state.filterOptions;
  },

  filter: state => {
    return state.filter;
  },
  
  searchString: state => {
    return state.filter.searchString;
  },

  searchRegExp: (state, getters) => {
    let searchString = getters.searchString.trim();
    return new RegExp(removeDiacritics(searchString), 'gi');
  },

  locale: (state) => {
    return state.locale;
  } 
}