import { removeDiacritics } from "~/plugins/helpers"; 
import * as filters from "./resousrceFilterUtilities";

export default {
  resources: (state, {filter, sortOrder, searchString, searchRegExp, locale}) => {
    let resources = state.library.map(resource => ({...resource}));

    resources = filters.filterByDatePublished(resources, filter);
    resources = filters.filterByLanguage(resources, filter);
    resources = filters.filterByGeographicScope(resources, filter);
    resources = filters.filterByContentType(resources, filter);
    resources = filters.filterByIssue(resources, filter);
    resources = filters.filterBySearchString(resources, searchString, searchRegExp, locale);

    resources = filters.orderBySortField(resources, sortOrder);

    return resources;
  },

  filterOptions: state => {
    return state.filterOptions;
  },

  filter: state => {
    return state.filter;
  },
  
  searchString: state => {
    return state.searchString;
  },

  searchRegExp: (state, getters) => {
    let searchString = getters.searchString.trim();
    return new RegExp(removeDiacritics(searchString), 'gi');
  },

  locale: state => {
    return state.locale;
  },

  copy: state => {
    return state.copy;
  },

  sortOrderId: state => {
    return state.sortOrderId;
  },

  sortOrder: (state, {sortOrderId}) => {
    return state.sortOrderOptions.find(option => option.id === sortOrderId);
  },
  
  sortOrderOptions: state => {
    return state.sortOrderOptions;
  },

  issueCategories: state => {
    return state.issueOptionCategories;
  }
}