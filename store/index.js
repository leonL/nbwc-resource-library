export const state = () => ({
  data: {
      resources: []
  }
})

export const actions = {
  async nuxtServerInit ({ state }, { req }) {
    this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer')
    const httpAirtableNbwcBase = this.$http.create({ 
        prefixUrl: 'https://api.airtable.com/v0/appxlBEhiWnssKkbm',
        searchParams: [['view', 'ALL RECORDS']]
    })

    let offsetToken = '', allResourcesFetched = false
    while (allResourcesFetched === false) {
      let fetchedResourcesJson = await httpAirtableNbwcBase.$get('RESOURCES', 
        {searchParams: [
          ['view', 'POST'], 
          ['offset', offsetToken],
          ['sort[0][field]', 'RECORD_CREATED_DATE'],
          ['sort[0][direction]', 'desc']
        ]}
      ),
      fetchedResources = fetchedResourcesJson.records.map(record => record.fields),
      validFetchedResources = validResourcesFilter(fetchedResources)

      state.data['resources'] = [...state.data['resources'], ...validFetchedResources]
      fetchedResourcesJson['offset'] ? (offsetToken = fetchedResourcesJson['offset']) : (allResourcesFetched = true)
    }

    const allGeographicScopes = await httpAirtableNbwcBase.$get('GEOGRAPHIC%20SCOPES')
    state.data['allGeographicScopes'] = allGeographicScopes.records.map(record => record.fields) 

    const allContentTypes = await httpAirtableNbwcBase.$get('CONTENT%20TYPES')
    state.data['allContentTypes'] = allContentTypes.records.map(record => record.fields) 

    const allIssues = await httpAirtableNbwcBase.$get('ISSUES')
    state.data['allIssues'] = allIssues.records.map(record => record.fields) 

    const allLanguages = await httpAirtableNbwcBase.$get('LANGUAGES')
    state.data['allLanguages'] = allLanguages.records.map(record => record.fields)

    const text = await httpAirtableNbwcBase.$get('TEXT')
    state.data['text'] = text.records.map(record => record.fields)
  }
}

const validResourcesFilter = (resources) => {
  let validResources = resources.filter(r => {
    let isValid = true;

    if (hasLanguage(r)) {
      let langId = r['LANGUAGE ID'][0];

      if (langId === 'BOTH') {
        isValid = hasTitle(r, "EN") && hasLink(r, "EN") && hasTitle(r, "FR") && hasLink(r, "FR");
      } else {
        isValid = hasTitle(r, langId) && hasLink(r, langId);
      };

    } else {
      isValid = false;
    };

    return isValid;
  })

  return validResources
}

const hasLanguage = (resource) => {
  return resource.hasOwnProperty('LANGUAGE ID');
};

const hasTitle = (resource, langId) => {
  return resource.hasOwnProperty(`TITLE ${langId}`);
};

const hasLink = (resource, langId) => {
  return resource.hasOwnProperty(`DOCUMENT ${langId}`) || resource.hasOwnProperty(`LINK ${langId}`);
};