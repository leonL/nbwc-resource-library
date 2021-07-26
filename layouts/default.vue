<template>
  <div class="main-frame">

    <div class='header'>
      <div class="mobile-menu">
        <b-icon-list v-b-toggle="'menu'" class="burger"></b-icon-list>

        <b-collapse id="menu">
          <div class='mobile-links' v-on:click="collapse">
            <nuxt-link :to="localePath('/')" class="link">{{ $t('home') }}</nuxt-link>
            <nuxt-link :to="localePath('about')" class="link">{{ $t('about') }}</nuxt-link>
          </div>
        </b-collapse>
      </div>
       <nuxt-link :to="localePath('/')">
        <img :src="require(`../assets/NBWC_logo_${$i18n.locale}.png`)" class="logo"
          :alt="$t('altTextlogo')">
       </nuxt-link>
      <div class="links">
        <nuxt-link :to="localePath('/')" class="home">{{ $t('home') }}</nuxt-link>
        <nuxt-link :to="localePath('about')" class="about">{{ $t('about') }}</nuxt-link>
        <nuxt-link :to="switchLocalePath('fr')" class='localeToggle'>FR</nuxt-link>
        <nuxt-link :to="switchLocalePath('en')" class='localeToggle'>EN</nuxt-link>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { BIconList } from 'bootstrap-vue'

export default {
  head () {
    return {
      htmlAttrs: { lang: this.$i18n.locale },
      title: this.$t('homeTitle')
    }
  },
  methods: {
    collapse: function (event) {
      let toggleIcon = document.getElementsByClassName('burger')[0]
      toggleIcon.dispatchEvent(new Event('click'))
      return false
    }
  },

  created: function() {
    this.$store.dispatch('updateLocale', this.$i18n.locale);
  },

  components: {
    BIconList
  }
}
</script>

<style>
:root {
  --primary-color: #ee2740;
}

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

a {
  color: #3366FF;
}

body {
  font-family: 'Open Sans', sans-serif;
  line-height: normal;
}

.main-frame {
  width: 90%;
  max-width: 960px;
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
  background-color: #3366FF;
  padding: 5px 10px;
  color: #ffffff;
  text-decoration: none;
}

.logo {
  width: 239px;
}

.mobile-menu {
  display: none;
}

.burger {
  margin: 11px 5px 0 0;
  height: 28px;
  width: 28px;
}

.mobile-links .link {
  display: block;
  font-size: 20px;
  margin: 12px;
  color: #181818;
}

@media screen and (max-width: 767px) {
  .header {
    align-items: initial;
    justify-content: unset;
    margin-bottom: 10px;
  }

  .mobile-menu {
    display: block;
  }

  .mobile-menu svg:focus {
    outline: none;
  }

  #menu {
    position: absolute;
    background-color: white;
    left: 15px;
    right: 15px;
    border-radius: 5px;
    box-shadow: -2px 2px 5px -2px;
  }

  .burger {
    display: inline;
  }

  .links {
    font-size: 16px;
    position: absolute;
    right: 15px;
  }

  .links .home, .links .about {
    display: none;
  }

  .logo {
    width: 134px;
  }

  h1, h3 {
    font-size: 25px;
  }

  h4 {
    font-size: 20px;
  }

}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
