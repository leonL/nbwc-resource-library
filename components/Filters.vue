<template>
  <div>
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
        <YearRangeFilter />
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
  </div>
</template>

<script>
import CheckboxFilter from './Filters/CheckboxFilter.vue';
import RadioButtonFilter from './Filters/RadioButtonFilter.vue';
import YearRangeFilter from './Filters/YearRangeFilter.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Filters',
  
  methods: {
    ...mapActions(['updateFilter', 'clearFilters'])
  },

  components: {
    CheckboxFilter,
    RadioButtonFilter,
    YearRangeFilter
  }
}
</script>

<style>
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
  margin-right: 30px;
  font-size: 18px;
  font-weight: bold;
}

.toggle {
  position: relative;
}

.icon {
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
  top: 1px;
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