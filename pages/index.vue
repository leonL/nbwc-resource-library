<template>
  <div class='library'>
    <div class='titles'>
      <h2 class="page-title">
          {{ $t('homeTitle') }} 
      </h2>
      <h3 class="subtitle" v-html="$md.render(subtitle)"></h3>
    </div>

    <div class='ui'>
      <Filters />

      <div class='index'>
        <b-form-input v-bind:value="searchString" v-on:input="searchLibrary($event)" debounce="500"
          :placeholder="$t('searchPlaceholder')" class="search" :aria-label="$t('searchPlaceholder')"></b-form-input>

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

<style>
.ui {
  display: flex;
}

.index {
  width: 70%;
  /* border: 1px solid red; */
}

.subtitle {
  font-size: 24px;
  color: #767676;
  margin-bottom: 65px;
}

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

.page-title {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 15px;
}

@media screen and (max-width: 767px) {
  .page-title {
    font-size: 25px;
  }

  .subtitle {
    font-size: 13px;
    margin-bottom: 10px;
  }
}
</style>
