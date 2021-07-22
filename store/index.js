export const state = () => ({
  library: [],
  filterOptions: {
    languages: [],
    geographicScopes: [],
    contentTypes: [],
    issues: []
  },
  copy: [],
  apiConsts: apiConsts
})

const apiConsts = {
  url: 'https://api.airtable.com/v0/appxlBEhiWnssKkbm',
  defaultSearchParams: [['view', 'ALL RECORDS']],
  filterTypeTableNames: { 
    languages: 'LANGUAGES',
    geographicScopes: 'GEOGRAPHIC SCOPES',
    contentTypes: 'CONTENT TYPES',
    issues: 'ISSUES'
  },
  resourceFieldNames: {
    languageId: 'LANGUAGE ID',
    titleEn: 'TITLE EN',
    titleFr: 'TITLE FR',
    documentEnUrl: 'DOCUMENT EN',
    documentFrUrl: 'DOCUMENT FR',
    linkEnUrl: 'LINK EN',
    linkFrUrl: 'LINK FR'
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

export const getters = {
  validResources (state) {
    let resources = state.library.filter(r => {
      let isValid = true;

      if (hasLanguage(r)) {
        let langIdFieldName = apiConsts.resourceFieldNames.languageId,
          langId = r[langIdFieldName]['0'];

        if (langId === 'BOTH') {
          isValid = hasTitle(r, "EN") && hasLink(r, "EN") && hasTitle(r, "FR") && hasLink(r, "FR");
        } else {
          isValid = hasTitle(r, langId) && hasLink(r, langId);
        }
      } else {
        isValid = false;
      }
      return isValid;
    });
    return resources;
  }
}

const hasLanguage = (resource) => {
  return resource.hasOwnProperty(apiConsts.resourceFieldNames.languageId);
};

const hasTitle = (resource, langId) => {
  let resourceFieldNames = apiConsts.resourceFieldNames,
    titleFieldName = (langId === 'EN' ? resourceFieldNames.titleEn : resourceFieldNames.titleFr ); 
  return resource.hasOwnProperty(titleFieldName);
};

const hasLink = (resource, langId) => {
  let resourceFieldNames = apiConsts.resourceFieldNames,
    documentFieldName = (langId === 'EN' ? resourceFieldNames.documentEnUrl : resourceFieldNames.documentFrUrl),
    linkFieldName = (langId === 'EN' ? resourceFieldNames.linkEnUrl : resourceFieldNames.linkFrUrl ); 
  return resource.hasOwnProperty(documentFieldName) || resource.hasOwnProperty(linkFieldName);
};