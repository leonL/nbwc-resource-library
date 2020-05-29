<template>
  <div class="container">
    <div>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)">
      <h2 class="title">
        {{ $t('intro') }} 
      
      </h2>

      <RadioButtonFilter 
        :label="$t('language')"
        :options="allLanguages.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
        :defaultSelectedOptionId="checkedLanguageId"
        v-on:selectedOptionsChanged="checkedLanguageId=$event"
      />


      <CheckboxFilter 
        :label="$t('geoScopes')"
        :options="allGeographicScopes.map(scope => { return {text: scope[`${upperCaseLocale}`], value: scope.ID}})"
        v-on:selectedOptionsChanged="checkedScopeIds = $event"
      />

       <CheckboxFilter 
        :label="$t('contentTypes')"
        :options="allContentTypes.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
        v-on:selectedOptionsChanged="checkedContentTypeIds = $event"
      />

       <CheckboxFilter 
        :label="$t('issues')"
        :options="allIssues.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
        v-on:selectedOptionsChanged="checkedIssueIds = $event"
      />

      <b-form-input v-model="searchInputText" placeholder="Search" debounce="500"></b-form-input>

      <ul>
        <Resource
          v-for="(resource, index) in filterResources()"
          :index="index"
          :key="resource.id"
          :language="{id: resource['LANGUAGE ID'][0].toLowerCase(), label: resource[`LANGUAGE ${upperCaseLocale}`][0]}" 
          :titles="{en: resource['TITLE EN'], fr: resource['TITLE FR']}"
          :links="{en: resource['LINK EN'], fr: resource['LINK FR']}"
          :author="resource['AUTHOR']"
          :organization="getOrganization(resource)"
          :publication="getPublication(resource)"
          :contentTypes="resource[`CONTENT TYPES ${upperCaseLocale}`]" 
          :geographicScopes="resource[`GEOGRAPHIC SCOPE ${upperCaseLocale}`]" 
          :issues="resource[`ISSUES ${upperCaseLocale}`]" 
          :searchRegx="getSearchRegx()"
          :isTextSearching="isTextSearching()"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Resource from '@/components/Resource'
import CheckboxFilter from '@/components/FilterControls/CheckboxFilter.vue'
import RadioButtonFilter from '@/components/FilterControls/RadioButtonFilter.vue'

export default {
   data () {
    return {
      allLanguages: [],
      checkedLanguageId: "BOTH",
      allGeographicScopes: [],
      checkedScopeIds: [],
      allContentTypes: [],
      checkedContentTypeIds: [],
      allIssues: [],
      checkedIssueIds: [],
      resources: [],
      searchInputText: "",
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

    const $languagesModel = this.$http.create({
      prefixUrl: libraryBaseApiPrefix + '/LANGUAGES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $languagesModel.setToken(apiKey, 'Bearer')

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
    // console.log(allIssues.records[0])
    this.allIssues = allIssues.records.map(record => record.fields) 

    const allLanguages = await $languagesModel.$get('')
    // console.log(allLanguages.records[0])
    this.allLanguages = allLanguages.records.map(record => record.fields) 
  },
  methods: {
    filterResources () {
      let filteredResources = this.resources.slice(0, 70) // remove slice after implementing content management staging - temporary measure to aviod blank records while Airtable is being populated by NBWC

      if (this.checkedLanguageId !== "BOTH") {
        filteredResources = filteredResources.filter(r => {
          const rLangId = r['LANGUAGE ID'][0]
          return rLangId === "BOTH" || rLangId === this.checkedLanguageId 
        })
      }

      if (this.checkedScopeIds.length) {
        filteredResources = filteredResources.filter(r => {
          const rGeoScopeId = r['GEOGRAPHIC SCOPE ID'][0]
          return this.checkedScopeIds.includes(rGeoScopeId)
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

      if(this.isTextSearching()) {
        let searchRegx = this.getSearchRegx()

        filteredResources = filteredResources.filter(r => {
          let titleLanguage = r['LANGUAGE ID'][0]
          if (titleLanguage === 'BOTH') titleLanguage = this.upperCaseLocale 

          let titleWithoutDiacritics = this.$removeDiacritics(this.getTitle(r, titleLanguage))

          return searchRegx.test(titleWithoutDiacritics)
        })
      }
      return filteredResources
    },
    getSearchRegx() {
      return new RegExp(this.searchInputText.trim(), 'gi')
    },
    getTitle(resource, locale = this.upperCaseLocale) {
      let title = '',
      propertyName = `TITLE ${locale}`

      if (resource.hasOwnProperty(propertyName)) {
        title = resource[propertyName]
      }
      return title
    },
    getOrganization(resource, locale = this.upperCaseLocale) {
      let organization = '',
      propertyName = `ORGANIZATION ${locale}` 

      if (resource.hasOwnProperty(propertyName)) {
        organization = resource[propertyName][0]
      }
      return organization
    },
    getPublication(resource, locale = this.upperCaseLocale) {
      let publication = '',
      propertyName = `PUBLICATION ${locale}` 

      if (resource.hasOwnProperty(propertyName)) {
        publication = resource[propertyName][0]
      }
      return publication
    },
    isTextSearching() {
      return this.searchInputText.trim() ? true : false
    }
  },
  components: {
    Resource,
    CheckboxFilter,
    RadioButtonFilter
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

mark {
  padding: 0px;
}
</style>
