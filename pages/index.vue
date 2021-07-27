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
}

.titles {
  margin-bottom: 20px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 24px;
  color: #767676;
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
