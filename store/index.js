export const state = () => ({
    data: {
        resources: []
    }
})

export const actions = {
    async nuxtServerInit ({ state }, { req }) {
        const libraryBaseApiPrefix = 'https://api.airtable.com/v0/app393cel1ZJ5Wi13'
        
        this.$http.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer')
        
        const $resourcesModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/RESOURCES'
        })

        const $geographicScopesModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/GEOGRAPHIC%20SCOPES',
            searchParams: [['view', 'ALL RECORDS']]
        })

        const $contentTypesModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/CONTENT%20TYPES',
            searchParams: [['view', 'ALL RECORDS']]
        })

        const $issuesModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/ISSUES',
            searchParams: [['view', 'ALL RECORDS']]
        })

        const $languagesModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/LANGUAGES',
            searchParams: [['view', 'ALL RECORDS']]
        })
        
        const $textModel = this.$http.create({
            prefixUrl: libraryBaseApiPrefix + '/TEXT',
            searchParams: [['view', 'ALL RECORDS']]
        })

        let offsetToken = '', allResourcesFetched = false
        while (allResourcesFetched === false) {
            let fetchedResourcesJson = await $resourcesModel.$get('', {searchParams: [['view', 'POST'], ['offset', offsetToken]]}),
            fetchedResources = fetchedResourcesJson.records.map(record => record.fields),
            validFetchedResources = fetchedResources.filter(r => {
                return (r['LANGUAGE ID'] && (r['TITLE EN'] && ['LINK EN']) || (r['TITLE FR'] && ['LINK FR'])) ? true : false
            })

            state.data['resources'] = [...state.data['resources'], ...validFetchedResources]
            fetchedResourcesJson['offset'] ? (offsetToken = fetchedResourcesJson['offset']) : (allResourcesFetched = true)
        }

        const allGeographicScopes = await $geographicScopesModel.$get('')
        // console.log(allGeographicScopes.records[0])
        state.data['allGeographicScopes'] = allGeographicScopes.records.map(record => record.fields) 

        const allContentTypes = await $contentTypesModel.$get('')
        // console.log(allContentTypes.records[0])
        state.data['allContentTypes'] = allContentTypes.records.map(record => record.fields) 

        const allIssues = await $issuesModel.$get('')
        // console.log(allIssues.records[0])
        state.data['allIssues'] = allIssues.records.map(record => record.fields) 

        const allLanguages = await $languagesModel.$get('')
        // console.log(allLanguages.records[0])
        state.data['allLanguages'] = allLanguages.records.map(record => record.fields)

        const text = await $textModel.$get('')
        // console.log(text.records[0])
        state.data['text'] = text.records.map(record => record.fields)
    }
}
