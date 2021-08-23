<template>
  <div class="filters">
    <h1 class="title main">{{ $t('filters') }}</h1>

    <b-button class='clear' variant="link" v-on:click="clearFilters()">{{ $t('clearFilters') }}</b-button>

    <div class='date-published filter'>
      <div v-b-toggle.datePublishedOptions class='toggle'>
        <img class="icon calendar" src="~/assets/calendar.png">
        <h2 class='heading'>{{ $t('publicationYear') }}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="datePublishedOptions" class="options">
        <RadioButtonFilter :type="'datePublishedRangePresetId'" />
      </b-collapse>
    </div>

    <div class="language filter">
      <div v-b-toggle.languageOptions class='toggle'>
        <img class="icon" src="~/assets/language.png">
        <h2 class='heading'>{{ $t('language') }}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="languageOptions" class="options">
        <RadioButtonFilter 
          :type="'languageId'"
        />
      </b-collapse>
    </div>

    <div class="geographic-scopes filter">
      <div v-b-toggle.geographicScopeOptions class='toggle'>
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='heading'>{{ $t('geographicScope') }}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="geographicScopeOptions" class="options">
        <CheckboxFilter :type="'geographicScopeIds'" />
      </b-collapse>
    </div>

    <div class="content-types filter">
      <div v-b-toggle.contentTypeOptions class='toggle'>
        <img class="icon" src="~/assets/content-type.png">
        <h2 class='heading'>{{ $t('contentTypesFilter')}}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="contentTypeOptions" class="options">
        <CheckboxFilter :type="'contentTypeIds'" />
      </b-collapse>
    </div>

    <div class="issues filter">
      <div v-b-toggle.issuesOptions class='toggle'>
        <img class="icon" src="~/assets/issues.png">
        <h2 class='heading'>{{ $t('issuesFilter') }}</h2>
        <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        <client-only>
          <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="issuesOptions" class="options">
        <IssueFilter />
      </b-collapse>
    </div>

  </div>
</template>

<script>
import CheckboxFilter from './Filters/CheckboxFilter.vue';
import RadioButtonFilter from './Filters/RadioButtonFilter.vue';
import MonthRangeFilter from './Filters/MonthRangeFilter.vue';
import IssueFilter from './Filters/IssueFilter.vue';
import { mapActions } from 'vuex';

export default {
  name: 'filters',
  
  methods: {
    ...mapActions(['updateFilter', 'clearFilters'])
  },

  components: {
    CheckboxFilter,
    RadioButtonFilter,
    MonthRangeFilter,
    IssueFilter
  }
}
</script>

<style>
.filters {
  padding-right: 40px;
  width: 30%;
}

.title {
  font-weight: bold;
  color: black;
  font-size: 24px;
}

.clear {
  font-size: 20px;
  color: black;
  padding: 0;
  text-decoration: underline;
  margin-bottom: 20px;
}

.filter {
  margin-bottom: 25px;
}

.heading {
  font-size: 18px;
}

.toggle {
  position: relative;
}

.toggle .icon {
  float: left;
  margin-right: 5px;
  position: relative;
  top: 2px;
}

.icon.calendar {
  top: 0;
}

.icon.globe {
  width: 19px;
  height: 19px;
  top: 1px;
}

.chevron {
  position: absolute;
  bottom: 1px;
  right: 10px;
}

.chevron svg {
  stroke: black;
  stroke-width: 2;
}

.collapsed > .chevron.up,
.not-collapsed > .chevron.down {
  display: none;
}

.options {
  margin: 15px 0;
}

.options label {
  font-size: 18px;
  color: black;
}
</style>