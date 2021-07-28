<template>
  <div>
    <div class='titles'>
      <h1 class="title">
          {{ $t('homeTitle') }} 
      </h1>
      <h3 class="subtitle" v-html="$md.render(subtitle)"></h3>
    </div>

    <div class='library'>
      <Filters />

      <div class='index'>
        <b-form-input v-bind:value="searchString" v-on:input="searchLibrary($event)" debounce="500"
          :placeholder="$t('searchPlaceholder')" class="search" :aria-label="$t('searchPlaceholder')"></b-form-input>
        <img class="icon search" src="~/assets/search.png">

        <ResourceList />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/Filters.vue';
import ResourceList from '@/components/ResourceList.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['searchLibrary'])
  },

  computed: {
    ...mapGetters(['resources', 'searchString', 'searchRegExp', 'copy']),
    subtitle() {
      return this.copy[`${this.$i18n.locale.toLowerCase()}Subtitle`];
    }
  },

  components: {
    Filters,
    ResourceList
  }
}
</script>

<style scoped>
.library {
  display: flex;
}

.index {
  width: 70%;
  position: relative;
}

.titles {
  margin-bottom: 40px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.subtitle {
  font-size: 24px;
  color: #767676;
}

input.search {
  padding-left: 35px;
}

.search.icon {
  position: absolute;
  top: 7px;
  left: 6px;
}

@media screen and (max-width: 767px) {
  .title {
    font-size: 25px;
  }

  .subtitle {
    font-size: 13px;
    margin-bottom: 10px;
  }
}
</style>
