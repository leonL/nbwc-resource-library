export default {
  addResourcesToLibrary (state, resources) {
    state.library = [...state.library, ...resources];
  },
  setFilterOptions (state, filter) {
    state.filterOptions[filter.type] = filter.options;
  },
  setCopy (state, copy) {
    state.copy = copy;
  }
}