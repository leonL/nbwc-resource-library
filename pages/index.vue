<template>
  <div class="container">
    <div>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)">
      <h2 class="title">
        {{ $t('intro') }} 
      
      </h2>

      <FilterControl 
        v-bind:label="$t('geoScopes')"
        v-bind:options="allGeographicScopes.map(scope => { return {text: scope[`${upperCaseLocale}`], value: scope.ID}})"
        v-on:optionsChanged="checkedScopeIds = $event"
      />

       <FilterControl 
        v-bind:label="$t('contentTypes')"
        v-bind:options="allContentTypes.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
        v-on:optionsChanged="checkedContentTypeIds = $event"
      />

       <FilterControl 
        v-bind:label="$t('issues')"
        v-bind:options="allIssues.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
        v-on:optionsChanged="checkedIssueIds = $event"
      />

      <ul>
        <Resource
          v-for="(resource, index) in filterResources()"
          v-bind:index="index"
          v-bind:key="resource.id"
          v-bind:language="{id: resource['LANGUAGE ID'][0].toLowerCase(), label: resource[`LANGUAGE ${upperCaseLocale}`][0]}" 
          v-bind:titles="{en: resource['TITLE EN'], fr: resource['TITLE FR']}"
          v-bind:links="{en: resource['LINK EN'], fr: resource['LINK FR']}"
          v-bind:contentTypes="resource[`CONTENT TYPES ${upperCaseLocale}`]" 
          v-bind:geographicScopes="resource[`GEOGRAPHIC SCOPES ${upperCaseLocale}`]" 
          v-bind:issues="resource[`ISSUES ${upperCaseLocale}`]" 
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Resource from '@/components/Resource'
import FilterControl from '@/components/FilterControl'

export default {
   data () {
    return {
      allGeographicScopes: [],
      checkedScopeIds: [],
      allContentTypes: [],
      checkedContentTypeIds: [],
      allIssues: [],
      checkedIssueIds: [],
      resources: [],
      upperCaseLocale: this.$i18n.locale.toUpperCase()
    }
  },
  async fetch () {
    const libraryBaseApiPrefix = 'https://api.airtable.com/v0/app393cel1ZJ5Wi13',
    apiKey = process.env.NBWC_AIRTABLE_API_KEY
    
    const $resourcesModel = this.$http.create({
      prefixUrl: libraryBaseApiPrefix + '/RESOURCES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $resourcesModel.setToken(apiKey, 'Bearer')

    const $geographicScopesModel = this.$http.create({
      prefixUrl: libraryBaseApiPrefix + '/GEOGRAPHIC%20SCOPES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $geographicScopesModel.setToken(apiKey, 'Bearer')

    const $contentTypesModel = this.$http.create({
      prefixUrl: libraryBaseApiPrefix + '/CONTENT%20TYPES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $contentTypesModel.setToken(apiKey, 'Bearer')
    
    const $issuesModel = this.$http.create({
      prefixUrl: libraryBaseApiPrefix + '/ISSUES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $issuesModel.setToken(apiKey, 'Bearer')

    const allResources = await $resourcesModel.$get('')
    // console.log(allResources.records[0])
    this.resources = allResources.records.map(record => record.fields) 

    const allGeographicScopes = await $geographicScopesModel.$get('')
    // console.log(allGeographicScopes.records[0])
    this.allGeographicScopes = allGeographicScopes.records.map(record => record.fields) 

    const allContentTypes = await $contentTypesModel.$get('')
    // console.log(allContentTypes.records[0])
    this.allContentTypes = allContentTypes.records.map(record => record.fields) 

    const allIssues = await $issuesModel.$get('')
    console.log(allIssues.records[0])
    this.allIssues = allIssues.records.map(record => record.fields) 
  },
  methods: {
    filterResources () {
      let filteredResources = this.resources

      if (this.checkedScopeIds.length) {
        filteredResources = filteredResources.filter(r => {
          return r['GEOGRAPHIC SCOPE IDS'].some(id => {
            return this.checkedScopeIds.includes(id)
          })
        }) 
      }

      if (this.checkedContentTypeIds.length) {
        filteredResources = filteredResources.filter(r => {
          return r['CONTENT TYPE IDS'].some(id => {
            return this.checkedContentTypeIds.includes(id)
          })
        })
      }

      if (this.checkedIssueIds.length) {
        filteredResources = filteredResources.filter(r => {
          return r['ISSUE IDS'].some(id => {
            return this.checkedIssueIds.includes(id)
          })
        })
      }
      return filteredResources
    }
  },
  components: {
    Resource,
    FilterControl
  }
}
</script>

<style>
.container {
  margin: 10px auto;
  /* min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
