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
          :defaultOptionId="'anyDate'"
          v-on:newValue="newFilterValue('datePublishedRangePreset', $event)"
        />
        <MonthRangeFilter 
          v-on:newValue="newFilterValue('customDatePublishedRange', $event)"
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
          :defaultOptionId="defaultValues.languageId"
          v-on:newValue="newFilterValue('languageId', $event)"
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
          :defaultOptionIds="defaultValues.geographicScopeIds"
          v-on:newValue="newFilterValue('geographicScopeIds', $event)"
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
          :defaultOptionIds="defaultValues.contentTypeIds"
          v-on:newValue="newFilterValue('contentTypeIds', $event)"
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
          :defaultOptionIds="defaultValues.issueIds"
          v-on:newValue="newFilterValue('issueIds', $event)"
        />
      </b-collapse>
    </div>

  </div>
</template>

<script>
  import CheckboxFilter from './Filters/CheckboxFilter.vue';
  import RadioButtonFilter from './Filters/RadioButtonFilter.vue';
  import MonthRangeFilter from './Filters/MonthRangeFilter.vue'

  export default {
    name: 'filters',

    props: {
      defaultValues: Object
    },
    
    data () {
      const dataStore = this.$store.state.data;
      return {
        options: {
          datePublishedRanges: [
            { ID: 'anyDate', EN:  'Any', FR: 'Quelconque' },
            { ID: 'pastMonth', EN:  'Past month', FR: 'Mois passé' },
            { ID: 'pastYear', EN:  'Past Year', FR: "L'année passée" },
            { ID: 'customDateRange', EN:  'Custom date range', FR: 'Plage de dates personnalisée' }
          ],
          languages: dataStore['languages'],
          geographicScopes: dataStore['geographicScopes'],
          contentTypes: dataStore['contentTypes'],
          issues: dataStore['issues']
        }
      }
    },

    methods: {
      newFilterValue(filterField, newValue) {
        this.$emit('newFilterValue', {field: filterField, value: newValue} );
      },
      optionsHtmlAttrsByFilterType(type) {
        return this.options[type].map(type => { 
          return { text: type[this.locale.toUpperCase()], value: type.ID } 
        });
      }
    },
    
    computed: {
      locale: function() {
        return this.$i18n.locale;
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