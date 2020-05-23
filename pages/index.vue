<template>
  <div class="container">
    <div>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)">
      <h2 class="title">
        {{ $t('intro') }} 
      </h2>
      <p>{{ resourceTitles }}</p>
      <!-- <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div> -->
    </div>
  </div>
</template>
<script>

export default {
   data () {
    return {
      resourceTitles: []
    }
  },
  async fetch () {
    const $nbwcResorcesBase = this.$http.create({
      prefixUrl: 'https://api.airtable.com/v0/app393cel1ZJ5Wi13/RESOURCES',
      searchParams: [['view', 'ALL RECORDS']]
    })
    $nbwcResorcesBase.setToken(process.env.NBWC_AIRTABLE_API_KEY, 'Bearer')
    const data = await $nbwcResorcesBase.$get('')
    this.resourceTitles = data.records.map(record => record.fields.TITLE) 
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
