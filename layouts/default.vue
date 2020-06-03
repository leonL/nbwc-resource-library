<template>
  <div class="container">
    <div class='header'>
       <nuxt-link :to="localePath('/')">
        <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)" class="logo"
          :alt="$t('altTextlogo')">
       </nuxt-link>
      <div class="links">
        <nuxt-link :to="localePath('/')">{{ $t('home') }}</nuxt-link>
        <nuxt-link :to="localePath('about')">{{ $t('about') }}</nuxt-link>
        <nuxt-link :to="switchLocalePath('fr')" class='localeToggle'>FR</nuxt-link>
        <nuxt-link :to="switchLocalePath('en')" class='localeToggle'>EN</nuxt-link>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
export default {
  head () {
    return {
      htmlAttrs: { lang: this.$i18n.locale },
      title: this.$t('homeTitle')
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
}

.links a {
  color: #000000;
  margin-right: 25px;
}

.links a.localeToggle {
  font-weight: bold;
  margin-right: 0;
}

.links a.nuxt-link-exact-active {
  text-decoration: underline;
}

.links a.nuxt-link-exact-active.localeToggle {
  border-radius: 27px;
  background-color: #11b6ff;
  padding: 5px 10px;
  color: #ffffff;
  text-decoration: none;
}

.logo {
  width: 239px;
}

.page-title {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 15px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
