<template>
  <div class="container">
    <div class='header'>
      <nuxt-link :to="switchLocalePath('fr')">FR</nuxt-link>
      <nuxt-link :to="switchLocalePath('en')">EN</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.$t('intro')
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  line-height: normal;
}

.container {
  margin: 10px auto;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
