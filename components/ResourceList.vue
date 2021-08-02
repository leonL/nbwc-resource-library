<template>
  <div class='page'>

    <div class="details">
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
      <span class="sortBy">
        Sort by 
        <b-dropdown right text="date posted (newest to oldest)" variant="link">
          <b-dropdown-item href="#">date posted (newest to oldest)</b-dropdown-item>
          <b-dropdown-item href="#">date posted (oldest to newest)</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#">date published (newest to oldest)</b-dropdown-item>
          <b-dropdown-item href="#">date published (oldest to newest)</b-dropdown-item>
        </b-dropdown>
      </span>
    </div>
    
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

<style> 
.details {
  display: flex;
}

.resource-count {
  font-size: 18px;
  margin-left: 3px;
  font-weight: bold;
}

.sortBy {
  flex-grow: 1;
  text-align: right;
  /* border: 1px solid black; */
}

.dropdown .btn {
  font-size: 18px;
  padding: 0;
  border: 0;
  position: relative;
  bottom: 2px;
  color: black;
  font-weight: bold;
}

li a.dropdown-item {
  text-decoration: unset;
  font-weight: bold;
  text-align: right;
  font-size: 14px;
}

.resources {
  padding: 0;
}

</style>
