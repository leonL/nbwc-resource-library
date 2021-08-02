<template>
  <div class='categories'>
    <div v-for="category in categoriesInAlphaOrder" :key="category.ID">
      <div v-b-toggle="category.ID" class='toggle'>
        <h2 class='category'>{{ category[upperCaseLocale] }}</h2>
        <span class='toggle-icon up' aria-hidden="true"><b-icon icon="plus"></b-icon></span>
        <client-only>
          <span class='toggle-icon down' aria-hidden="true"><b-icon icon="dash"></b-icon></span>
        </client-only>
      </div>
      <b-collapse :id="category.ID" class="issueOptions">
        <b-form-checkbox v-for="option in categoryOptions(category.ID)" :key="option.value" :value="option.value" class="mb-3"
          :checked="filter.issueIds" v-on:change="updateFilter({type: 'issueIds', value: $event})">
          {{ option.text }}
        </b-form-checkbox>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'IssueFilter',

  computed: {
    ...mapGetters(['issueCategories', 'filter', 'filterOptions']),
    upperCaseLocale() {
      return this.$i18n.locale.toUpperCase();
    },
    categoriesInAlphaOrder() {
      let categories = [...this.issueCategories];
      return categories.sort((a, b) => {
        let aLabel = a[this.upperCaseLocale],
          bLabel = b[this.upperCaseLocale]

        if (aLabel > bLabel) {
          return 1;
        }
        if (aLabel < bLabel) {
          return -1;
        }
        return 0;
      });
    }
  },

  methods: {
    ...mapActions(['updateFilter']),
    categoryOptions(categoryId) {
      let issues = this.filterOptions.issueIds.filter(issue => {
        return issue['CATEGORY ID'][0] === categoryId;
      });
      let htmlAttrs = this.$mapFilterOptionsToHtmlAttrs(issues, this.$i18n.locale);
      return htmlAttrs;
    }
  }

}
</script>

<style>
.categories {
  margin-left: 10px;
}

.category {
  font-size: 16px;
}

.toggle-icon {
  position: absolute;
  bottom: 1px;
  right: 10px;
}

.collapsed > .toggle-icon.down,
.not-collapsed > .toggle-icon.up {
  display: none;
}

</style>