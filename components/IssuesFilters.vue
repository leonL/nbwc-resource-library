<template>
  <div>
    <img class="icon hash" src="~/assets/issues.png">
    <h1 class="title main">{{ $t('issues') }}</h1>

    <b-button class='clear' variant="link" v-on:click="clearIssuesFilter()">{{ $t('clearFilters') }}</b-button>

    <div v-for="category in categoriesInAlphaOrder" :key="category.ID" class="issue filter">
      <div v-b-toggle="category.ID" class='toggle'>
        <h2 class='heading'>{{ category[upperCaseLocale] }}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse :id="category.ID" class="issueOptions">
        <b-form-checkbox v-for="option in categoryOptions(category.ID)" :key="option.value" :value="option.value" class="mb-3 options"
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
  name: 'IssuesFilters',

  computed: {
    ...mapGetters(['issueCategories', 'filter', 'filterOptions']),
    locale() {
      return this.$i18n.locale;
    },
    upperCaseLocale() {
      return this.locale.toUpperCase();
    },
    categoriesInAlphaOrder() {
      let categories = [...this.issueCategories], inOrder;
      
      inOrder = categories.sort((a, b) => {
        let aLabel = a[this.upperCaseLocale],
          bLabel = b[this.upperCaseLocale]
        return aLabel.localeCompare(bLabel, this.locale);       
      });

      return inOrder;
    }
  },

  methods: {
    ...mapActions(['updateFilter', 'clearIssuesFilter']),
    categoryOptions(categoryId) {
      let issues = this.filterOptions.issueIds.filter(issue => {
        return issue['CATEGORY ID'][0] === categoryId;
      }), issuesOrdered;

      issuesOrdered = issues.sort((a, b) => {
        let aText = a[this.upperCaseLocale],
          bText = b[this.upperCaseLocale];
        return aText.localeCompare(bText, this.locale);       
      });

      let htmlAttrs = this.$mapFilterOptionsToHtmlAttrs(issuesOrdered, this.$i18n.locale);
      return htmlAttrs;
    }
  }
}
</script>

<style>
.icon.hash {
  top: 5px;
}

.issue .heading {
  font-weight: normal;
}

.issue .chevron svg {
  stroke: black;
  stroke-width: 1;
}

</style>
