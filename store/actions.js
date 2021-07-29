import { url as apiUrl, defaultSearchParams, filterTypeTableNames } from "./apiUtilities";

export default {
  async fetchLibraryResources ({commit}) {
    
    let offsetToken = '', 
      allResourcesFetched = false, 
      searchParams = [
        ['view', 'POST'], 
        ['offset', offsetToken],
        ['sort[0][field]', 'RECORD_CREATED_DATE'],
        ['sort[0][direction]', 'desc']
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
      searchParams = defaultSearchParams,
      optionsJson = await this.api.$get(tableName, { searchParams }),
      options = optionsJson.records.map(r => r.fields);

    commit('setFilterOptions', {type: filterType, options});
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
      dispatch('fetchOptionsForFilterType', 'issueIds')
    ]);
  },

  async nuxtServerInit ({dispatch, commit}, _) {

    this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer');
    this.api = this.$http.create({ prefixUrl: apiUrl });

    commit('resetFilterState');
  
    await Promise.all([
      dispatch('fetchLibraryResources'),
      dispatch('fetchFilterOptions'),
      dispatch('fetchCopy')
    ]);
  },

  updateLocale ({commit}, locale) {
    commit('setLocale', locale);
  },

  searchLibrary ({commit}, searchString) {
    commit('setSearchString', searchString.trim());
  },

  updateFilter ({commit}, {type, value}) {
    commit('setFilter', {type, value});
  },

  resetFilter ({commit}) {
    commit('resetFilterState');
  }
}