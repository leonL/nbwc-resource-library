<template>
  <div class="container">
    <div>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)">
      <h2 class="title">
        {{ $t('intro') }} 
      </h2>
      <FilterControl v-bind:options="geographicScopes.map(scope => { return {text: scope[`${upperCaseLocale}`], value: scope.ID}})"/>
      <ul>
        <Resource
          v-for="(resource, index) in resources"
          v-bind:item="resource"
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
      resources: [],
      geographicScopes: [],
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

    const allResources = await $resourcesModel.$get('')
    // console.log(allResources.records[0])
    this.resources = allResources.records.map(record => record.fields) 

    const allGeographicScopes = await $geographicScopesModel.$get('')
    console.log(allGeographicScopes.records[0])
    this.geographicScopes = allGeographicScopes.records.map(record => record.fields) 
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
