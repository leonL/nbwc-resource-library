<template>
  <div>
    <div>
      <h2 class="page-title">
        {{ $t('homeTitle') }} 
      </h2>

      <div class="filter-controls">
        <RadioButtonFilter 
          :label="$t('language')"
          :options="allLanguages.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
          :defaultSelectedOptionId="checkedLanguageId"
          v-on:selectedOptionsChanged="checkedLanguageId=$event"
        />

        <CheckboxFilter 
          :label="$t('geoScopes')"
          :options="allGeographicScopes.map(scope => { return {text: scope[`${upperCaseLocale}`], value: scope.ID}})"
          :defaultSelectedOptionIds="checkedScopeIds"
          v-on:selectedOptionsChanged="checkedScopeIds = $event"
        />

        <CheckboxFilter 
          :label="$t('contentTypes')"
          :options="allContentTypes.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
          :defaultSelectedOptionIds="checkedContentTypeIds"
          v-on:selectedOptionsChanged="checkedContentTypeIds = $event"
        />

        <CheckboxFilter 
          :label="$t('issues')"
          :options="allIssues.map(type => { return {text: type[`${upperCaseLocale}`], value: type.ID}})"
          :defaultSelectedOptionIds="checkedIssueIds"
          v-on:selectedOptionsChanged="checkedIssueIds = $event"
        />

        <span v-on:click="clearFilters" class="clear-filters">{{ $t('clearFilters') }}</span>

        <b-form-input v-model="searchInputText" :placeholder="$t('searchPlaceholder')" debounce="500" class="search"></b-form-input>
      </div>
      
      <span class="resource-count">{{ $t('showing') }} {{ filterResources().length }} {{ $t('outOf') }} {{ resources.length }}</span>

      <ul class="resources">
        <Resource
          v-for="(resource, index) in filterResources()"
          :index="index"
          :key="resource.id"
          :language="{id: resource['LANGUAGE ID'][0].toLowerCase(), label: resource[`LANGUAGE ${upperCaseLocale}`][0]}" 
          :titles="{en: resource['TITLE EN'], fr: resource['TITLE FR']}"
          :links="{en: resource['LINK EN'], fr: resource['LINK FR']}"
          :author="getAuthor(resource)"
          :organization="getOrganization(resource)"
          :publication="getPublication(resource)"
          :contentTypes="resource[`CONTENT TYPES ${upperCaseLocale}`]" 
          :geographicScopes="resource[`GEOGRAPHIC SCOPE ${upperCaseLocale}`]" 
          :issues="resource[`ISSUES ${upperCaseLocale}`]"
          :paywall="getPaywall(resource)"
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
    const data = this.$store.state.data
    return {
      allLanguages: data.allLanguages,
      checkedLanguageId: "BOTH",
      allGeographicScopes: data.allGeographicScopes,
      checkedScopeIds: [],
      allContentTypes: data.allContentTypes,
      checkedContentTypeIds: [],
      allIssues: data.allIssues,
      checkedIssueIds: [],
      resources: data.resources,
      searchInputText: "",
      upperCaseLocale: this.$i18n.locale.toUpperCase()
    }
  },
  methods: {
    filterResources() {
      let filteredResources = this.resources.slice(0, 88) // remove slice after implementing content management staging - temporary measure to aviod blank records while Airtable is being populated by NBWC

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

          let titleWithoutDiacritics = this.$removeDiacritics(this.getTitle(r, titleLanguage)), 
          authorWithoutDiacritics = this.$removeDiacritics(this.getAuthor(r)),
          organizationWithoutDiacritics = this.$removeDiacritics(this.getOrganization(r)),
          publicationWithoutDiacritics = this.$removeDiacritics(this.getPublication(r)),
          keyWords = `${titleWithoutDiacritics} ${authorWithoutDiacritics} ${organizationWithoutDiacritics} ${publicationWithoutDiacritics}`

          return searchRegx.test(keyWords)
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
    getAuthor(resource) {
      return (resource['AUTHOR']) ? resource['AUTHOR'] : ""
    },
    getPaywall(resource) {
      return (resource['PAYWALL']) ? resource['PAYWALL'] : false
    },
    isTextSearching() {
      return this.searchInputText.trim() ? true : false
    },
    clearFilters() {
      this.checkedLanguageId = "BOTH"
      this.checkedScopeIds = []
      this.checkedContentTypeIds = []
      this.checkedIssueIds = []
      return true
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
input.search {
  margin-top: 0.5rem;
  max-width: 500px;
}

.filter-controls {
  margin-bottom: 15px;
}

.clear-filters {
  margin-left: 10px;
  text-decoration: underline;
  color: #000000;
}

.clear-filters:hover {
  cursor: pointer;
}

.resource-count {
  font-size: 15px;
  font-weight: 600;
}

.resources {
  padding: 0;
  position: relative;
}

ul.resources li:first-child {
  margin-top: 10px;
}

mark {
  padding: 0px;
}
</style>
