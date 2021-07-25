<template>
  <div class='library'>
    <div class='titles'>
      <h2 class="page-title">
          {{ $t('homeTitle') }} 
      </h2>
      <h3 class="subtitle" v-html="$md.render(subtitleTexts[$i18n.locale])" ></h3>
    </div>

    <div class='ui'>
      <Filters />

      <div class='index'>
        <b-form-input v-bind:value="searchString" v-on:input="searchLibrary($event)" debounce="500"
          :placeholder="$t('searchPlaceholder')" class="search" :aria-label="$t('searchPlaceholder')"></b-form-input>

        <ResourceList :resources="resources" />

        <client-only>
          <span v-if="totalResourcesCount > resourcesPerPage" class="resource-count">
            {{ currentPageIndexRange[0] + 1 }} 
            &#8211; {{ currentPageIndexRange[0] + pageResorcesCount }}
            {{ $t('of') }} {{ totalResourcesCount }} {{ $t('results') }}
          </span>
          <span v-else-if="totalResourcesCount === 0" class="resource-count zero">
            {{ $t('noResult') }}
          </span>
          <span v-else class="resource-count one-pager">
            {{ totalResourcesCount }} {{ $t('singlePageResults') }}
          </span>
        </client-only>
        <div v-if="totalResourcesCount > resourcesPerPage" class="pagination-controls">
          <client-only>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalResourcesCount"
              :per-page="resourcesPerPage"
              :hide-goto-end-buttons="true"
              :hide-ellipsis="true"
              :pills="true"
              align="center"
              aria-controls="resources-list">
            </b-pagination>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/Filters.vue';
import ResourceList from '@/components/ResourceList.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    const state = this.$store.state
    return {
      subtitleTexts: { en: state.copy[0]['HOME:SUBTITLE'], fr: state.copy[1]['HOME:SUBTITLE'] },
      currentPage: 1,
      resourcesPerPage: 10
    }
  },

  methods: {
    ...mapActions(['searchLibrary']),
    pageResources() {
      return this.resources.slice(...this.currentPageIndexRange)
    }
  },

  computed: {
    ...mapGetters([
      'resources', 'searchString', 'searchRegExp'
    ]),
    currentPageIndexRange() {
      let rangeEnd = this.resourcesPerPage * this.currentPage,
        rangeStart = rangeEnd - this.resourcesPerPage;
      return [rangeStart, rangeEnd];
    },
    totalResourcesCount() {
      return this.resources.length;
    },
    pageResorcesCount() {
      return this.pageResources().length;
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
