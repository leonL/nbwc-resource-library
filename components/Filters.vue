<template>
  <div class='filters'>
    <h5>{{ $t('filters') }}</h5>

    <div class='date-published filter'>
      <div v-b-toggle.datePublishedOptions class='toggle'>
        <h5>{{ $t('datePublished') }}</h5>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="datePublishedOptions">
        <RadioButtonFilter 
          :options="optionsHtmlAttrsByFilterType('datePublishedRanges')"
          :defaultOptionId="filter.datePublishedRangePreset"
          v-on:newValue="updateFilter({type: 'datePublishedRangePreset', value: $event})"
        />
        <MonthRangeFilter 
          v-on:newValue="updateFilter({type: 'customDatePublishedRange', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="language filter">
      <div v-b-toggle.languageOptions class='toggle'>
        <h5>{{ $t('language') }}</h5>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="languageOptions">
        <RadioButtonFilter 
          :options="optionsHtmlAttrsByFilterType('languages')"
          :defaultOptionId="filter.languageId"
          v-on:newValue="updateFilter({type: 'languageId', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="geographic-scopes filter">
      <div v-b-toggle.geographicScopeOptions class='toggle'>
        <h5>{{ $t('geographicScope') }}</h5>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="geographicScopeOptions">
        <CheckboxFilter 
          :options="optionsHtmlAttrsByFilterType('geographicScopes')"
          :defaultOptionIds="filter.geographicScopeIds"
          v-on:newValue="updateFilter({type: 'geographicScopeIds', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="content-types filter">
      <div v-b-toggle.contentTypeOptions class='toggle'>
        <h5>{{ $t('contentTypesFilter')}}</h5>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="contentTypeOptions">
        <CheckboxFilter 
          :options="optionsHtmlAttrsByFilterType('contentTypes')"
          :defaultOptionIds="filter.contentTypeIds"
          v-on:newValue="updateFilter({type: 'contentTypeIds', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="issues filter">
      <div v-b-toggle.issuesOptions class='toggle'>
        <h5>{{ $t('issuesFilter') }}</h5>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="issuesOptions">
        <CheckboxFilter 
          :options="optionsHtmlAttrsByFilterType('issues')"
          :defaultOptionIds="filter.issueIds"
          v-on:newValue="updateFilter({type: 'issueIds', value: $event})"
        />
      </b-collapse>
    </div>

  </div>
</template>

<script>
import CheckboxFilter from './Filters/CheckboxFilter.vue';
import RadioButtonFilter from './Filters/RadioButtonFilter.vue';
import MonthRangeFilter from './Filters/MonthRangeFilter.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'filters',
  
  data () {
    return {
      customDateRangeIsValid: false
    }
  },

  computed: {
    ...mapGetters(['filterOptions', 'filter']),
    locale: function() {
      return this.$i18n.locale;
    }
  },

  methods: {
    ...mapActions(['updateFilter']),
    optionsHtmlAttrsByFilterType(type) {
      return this.filterOptions[type].map(type => { 
        return { text: type[this.locale.toUpperCase()], value: type.ID } 
      });
    }
  },

  components: {
    CheckboxFilter,
    RadioButtonFilter,
    MonthRangeFilter
  }
};
</script>

<style scoped>
  .filters {
    padding-right: 30px;
    width: 30%;
    /* border: 1px dotted black; */
  }

  .toggle {
    position: relative;
    /* border: 1px dotted orange; */
  }

  .chevron {
    position: absolute;
    top: 0;
    right: 10px;
    /* border: 1px dotted blue; */
  }

  .collapsed > .chevron.down,
  .not-collapsed > .chevron.up {
    display: none;
  }
</style>