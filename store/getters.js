import { removeDiacritics } from "~/plugins/helpers"; 
import * as filters from "./resousrceFilterUtilities";

export default {
  resources: (state, {filter, sortOrder}) => {
    let resources = state.library.map(resource => ({...resource}));

    resources = filters.filterByPublicationYear(resources, filter);
    resources = filters.filterByLanguage(resources, filter);
    resources = filters.filterByGeographicScope(resources, filter);
    resources = filters.filterByContentType(resources, filter);
    resources = filters.filterByIssue(resources, filter);
    resources = filters.filterByOrganization(resources, filter);

    resources = filters.orderBySortField(resources, sortOrder);

    return resources;
  },

  earliestPublicationYear: state => {
    let publiationYears = state.library.map(resource => resource.publicationYear);
    return publiationYears.sort()[0];
  },

  filterOptions: state => {
    return state.filterOptions;
  },

  filter: state => {
    return state.filter;
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