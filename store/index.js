export const state = () => ({
  library: [],
  filterOptions: {
    languages: [],
    geographicScopes: [],
    contentTypes: [],
    issues: []
  },
  copy: []
})

const apiData = {
  url: 'https://api.airtable.com/v0/appxlBEhiWnssKkbm',
  defaultSearchParams: [['view', 'ALL RECORDS']],
  filterTypeTableNames: { 
    languages: 'LANGUAGES',
    geographicScopes: 'GEOGRAPHIC%20SCOPES',
    contentTypes: 'CONTENT%20TYPES',
    issues: 'ISSUES'
  }
}

export const mutations = {
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

export const actions = {
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

    let tableName = apiData.filterTypeTableNames[filterType],
      searchParams = apiData.defaultSearchParams,
      optionsJson = await this.api.$get(tableName, { searchParams }),
      options = optionsJson.records.map(r => r.fields);

    commit('setFilterOptions', {type: filterType, options});
  },
  
  async fetchCopy ({commit}) {
    let tableName = 'TEXT',
      searchParams = apiData.defaultSearchParams,
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

  async nuxtServerInit (context, _) {

    this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer');
    this.api = this.$http.create({ prefixUrl: apiData.url });
  
    await Promise.all([
      context.dispatch('fetchLibraryResources'),
      context.dispatch('fetchFilterOptions'),
      context.dispatch('fetchCopy')
    ]);
  }
}