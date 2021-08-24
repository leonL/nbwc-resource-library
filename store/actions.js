import { url as apiUrl, defaultSearchParams, filterTypeTableNames, filterSearchParams } from "./apiUtilities";

export default {
  async fetchLibraryResources ({commit}) {
    
    let offsetToken = '', 
      allResourcesFetched = false, 
      searchParams = [
        ['view', 'POST'], 
        ['offset', offsetToken]
      ]; 
      
    while (allResourcesFetched === false) {
      let fetchedResourcesJson = await this.api.$get('RESOURCES', { searchParams }),
        fetchedResources = fetchedResourcesJson.records.map(r => r.fields);

      fetchedResourcesJson['offset'] ? (offsetToken = fetchedResourcesJson['offset']) : (allResourcesFetched = true);
      commit('addResourcesToLibrary', fetchedResources);
    }
  }, 

  async fetchOptionsForFilterType ({commit}, filterType) {

    let tableName = encodeURI(filterTypeTableNames[filterType]),
      searchParams = filterSearchParams,
      optionsJson = await this.api.$get(tableName, { searchParams }),
      options = optionsJson.records.map(r => r.fields);

    commit('setFilterOptions', {type: filterType, options});
  },

  async fetchOptionsForIssuesFilter ({commit}) {

    let filterType = 'issueIds',
      tableName = encodeURI(filterTypeTableNames[filterType]),
      searchParams = [...filterSearchParams, ['fields', 'CATEGORY ID']],
      optionsJson = await this.api.$get(tableName, { searchParams }),
      issues = optionsJson.records.map(r => r.fields);

    commit('setFilterOptions', {type: filterType, options: issues});
  },

  async fetchIssueCategories ({commit}) {
  
    let tableName = encodeURI('ISSUE CATEGORIES'),
      searchParams = filterSearchParams,
      optionsJson = await this.api.$get(tableName, { searchParams }),
      categories = optionsJson.records.map(r => r.fields);

    commit('setIssueCategories', categories);
  },
  
  async fetchCopy ({commit}) {
    let tableName = 'TEXT',
      searchParams = defaultSearchParams,
      copyJson = await this.api.$get(tableName, {searchParams}),
      copy = copyJson.records.map(r => r.fields);

    commit('setCopy', copy);
  },

  async fetchFilterOptions ({dispatch}) {

    await Promise.all([
      dispatch('fetchOptionsForFilterType', 'languageId'),
      dispatch('fetchOptionsForFilterType', 'geographicScopeIds'),
      dispatch('fetchOptionsForFilterType', 'contentTypeIds'),
      dispatch('fetchOptionsForIssuesFilter'),
      dispatch('fetchIssueCategories')
    ]);
  },

  async nuxtServerInit ({dispatch, commit}, _) {

    this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer');
    this.api = this.$http.create({ prefixUrl: apiUrl });

    commit('resetFilterValues');
  
    await Promise.all([
      dispatch('fetchLibraryResources'),
      dispatch('fetchFilterOptions'),
      dispatch('fetchCopy')
    ]);
  },

  updateLocale ({commit}, locale) {
    commit('setLocale', locale);
  },

  updateFilter ({commit}, {type, value}) {
    commit('setFilter', {type, value});
  },

  clearFilters ({commit}) {
    commit('resetFilterValues');
  },

  clearIssuesFilter ({commit}) {
    commit('resetIssuesFilterValues');
  },

  updateSortOrderId ({commit}, sortOrderId) {
    commit('setSortOrderId', sortOrderId);
  }
}