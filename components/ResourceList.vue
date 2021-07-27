<template>
  <div class='page'>

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
    
    <ul id="resources-list" class="resources">
      <Resource
        v-for="(resource) in pageResources"
        :key="resource.id"
        :resource="resource"
      />
    </ul>

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
</template>

<script>
import Resource from './Resource.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ResourceList',

  data () {
    return {
      currentPage: 1,
      resourcesPerPage: 10
    }
  },

  computed: {
    ...mapGetters(['resources']),
    currentPageIndexRange() {
      let rangeEnd = this.resourcesPerPage * this.currentPage,
        rangeStart = rangeEnd - this.resourcesPerPage;
      return [rangeStart, rangeEnd];
    },
    totalResourcesCount() {
      return this.resources.length;
    },
    pageResorcesCount() {
      return this.pageResources.length;
    },
    pageResources() {
      return this.resources.slice(...this.currentPageIndexRange)
    }
  },

  components: {
    Resource
  },

  watch: {
    resources: function () {
      this.currentPage = 1;
    }
  },
}
</script>

<style scoped>
.resource-count {
  font-size: 15px;
  font-weight: 600;
}

.resources {
  padding: 0;
}

</style>
