import apiConsts from "./apiConstants";

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

    let tableName = encodeURI(apiConsts.filterTypeTableNames[filterType]),
      searchParams = apiConsts.defaultSearchParams,
      optionsJson = await this.api.$get(tableName, { searchParams }),
      options = optionsJson.records.map(r => r.fields);

    commit('setFilterOptions', {type: filterType, options});
  },
  
  async fetchCopy ({commit}) {
    let tableName = 'TEXT',
      searchParams = apiConsts.defaultSearchParams,
      copyJson = await this.api.$get(tableName, {searchParams}),
      copy = copyJson.records.map(r => r.fields);

    commit('setCopy', copy);
  },

  async fetchFilterOptions (context) {

    await Promise.all([
      context.dispatch('fetchOptionsForFilterType', 'languages'),
      context.dispatch('fetchOptionsForFilterType', 'geographicScopes'),
      context.dispatch('fetchOptionsForFilterType', 'contentTypes'),
      context.dispatch('fetchOptionsForFilterType', 'issues')
    ]);
  },

  async nuxtServerInit ({dispatch}, _) {

    this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer');
    this.api = this.$http.create({ prefixUrl: apiConsts.url });
  
    await Promise.all([
      dispatch('fetchLibraryResources'),
      dispatch('fetchFilterOptions'),
      dispatch('fetchCopy')
    ]);
  }
}