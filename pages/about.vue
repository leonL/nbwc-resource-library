<template>
    <div>
      <div v-html="$md.render(aboutLibrary)" class="about library"></div>
      <div class='double-pane'>
        <div v-html="$md.render(aboutNBWC)" class="about-nbwc"></div>
        <div v-html="$md.render(aboutOpenCall)" class="about-open-call"></div>
      </div>
      <div class="logos">
        <a :href="$t('nbwcURL')" target="_blank">
          <img src="~/assets/NBWC_logo_icon.png" class="logo"
            :alt="$t('altTextlogo')">
        </a>
        <a :href="$t('facebookURL')" target="_blank">
          <img src="~/assets/fb_logo.png" class="logo"
            alt="Facebook logo">
        </a>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['copy']),
    aboutLibrary() {
      return this.copy[`${this.$i18n.locale.toLowerCase()}AboutLibrary`];
    },
    aboutNBWC() {
      return this.copy[`${this.$i18n.locale.toLowerCase()}AboutNBWC`];
    },
    aboutOpenCall() {
      return this.copy[`${this.$i18n.locale.toLowerCase()}AboutOpenCall`];
    }
  },

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  } 
}
</script>

<style scoped>

.double-pane {
  display: flex;
  align-items: flex-start;
  margin: 50px 0 5px 0;
}

.about-nbwc {
  margin-right: 25px;  
}

.about-open-call {
  margin-left: 25px;
}

.logos {
  margin-bottom: 30px;
}

.logo {
  width: 65px;
  margin-right: 15px;
}

@media screen and (max-width: 767px) {
  .double-pane {
    display: block;
    margin: 10px 0 20px 0;
  }

  .about-open-call {
    margin-left: 0;
  }
}
</style>
