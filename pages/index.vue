<template>
  <div class="container">
    <div>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)">
      <h2 class="title">
        {{ $t('intro') }} 
      </h2>
      <Resource
        v-for="(resource, index) in resources"
        v-bind:item="resource"
        v-bind:index="index"
        v-bind:key="resource.id"
        v-bind:title="resource['TITLE']"
        v-bind:link="resource['LINK']"
        v-bind:contentTypes="resource[`CONTENT TYPES ${upperCaseLocale}`]" 
        v-bind:geographicScopes="resource[`GEOGRAPHIC SCOPES ${upperCaseLocale}`]" 
        v-bind:language="resource[`LANGUAGE ${upperCaseLocale}`][0]" 
        v-bind:issues="resource[`ISSUES ${upperCaseLocale}`]" 
      />
    </div>
  </div>
</template>

<script>
import Resource from '@/components/Resource'

export default {
   data () {
    return {
      resources: [],
      upperCaseLocale: this.$i18n.locale.toUpperCase()
    }
  },
  async fetch () {
    const $nbwcResorcesBase = this.$http.create({
      prefixUrl: 'https://api.airtable.com/v0/app393cel1ZJ5Wi13/RESOURCES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $nbwcResorcesBase.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer')
    const data = await $nbwcResorcesBase.$get('')
    console.log(data.records[0])
    this.resources = data.records.map(record => record.fields) 
  },
  components: {
    Resource
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
