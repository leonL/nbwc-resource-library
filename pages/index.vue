<template>
  <div>
    <div class='titles'>
      <h1 class="title">
          {{ $t('homeTitle') }} 
      </h1>
      <h3 class="subtitle" v-html="$md.render(subtitle)"></h3>
    </div>

    <div class='library'>
      <div class="filters">
        <IssuesFilters /> 
        <Filters />
      </div>

      <div class='index'>
        <ResourceList />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/Filters.vue';
import IssuesFilters from '@/components/IssuesFilters.vue';
import ResourceList from '@/components/ResourceList.vue';
import { mapGetters, mapActions } from 'vuex';

export default {

  computed: {
    ...mapGetters(['resources', 'copy']),
    subtitle() {
      return this.copy[`${this.$i18n.locale.toLowerCase()}Subtitle`];
    }
  },

  components: {
    Filters,
    IssuesFilters,
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

.filters {
  padding-right: 40px;
  width: 30%;
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
