import { resourceFieldNames } from "./apiUtilities";

export default {
  resources: state => {
    return state.library;
  },

  searchString: state => {
    return state.filters.searchString;
  },

  searchRegExp: (state, getters) => {
    let searchString = getters.searchString.trim();
    return new RegExp(removeDiacritics(searchString), 'gi');
  }
}  