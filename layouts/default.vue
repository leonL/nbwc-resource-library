<template>
  <div class="container">
    <div class='header'>
      <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)" class="logo">
      <div class="links">
        <nuxt-link :to="switchLocalePath('fr')">FR</nuxt-link>
        <nuxt-link :to="switchLocalePath('en')">EN</nuxt-link>
      </div>
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

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 60px;
}

.links {
  align-self: center;
  font-size: 25px;
  font-weight: bold;
}

.links a {
  color: #000000
}

.links a.nuxt-link-exact-active {
  border-radius: 27px;
  background-color: #11b6ff;
  padding: 5px 10px;
  color: #ffffff;
}

.logo {
  width: 239px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
