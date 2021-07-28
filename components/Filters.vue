<template>
  <div class="filters">
    <h1 class="title main">{{ $t('filters') }}</h1>

    <div class='date-published filter'>
      <div v-b-toggle.datePublishedOptions class='toggle'>
        <img class="icon calendar" src="~/assets/calendar.png">
        <h2 class='title'>{{ $t('datePublished') }}</h2>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="datePublishedOptions" class="options">
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
        <img class="icon" src="~/assets/language.png">
        <h2 class='title'>{{ $t('language') }}</h2>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="languageOptions" class="options">
        <RadioButtonFilter 
          :options="optionsHtmlAttrsByFilterType('languages')"
          :defaultOptionId="filter.languageId"
          v-on:newValue="updateFilter({type: 'languageId', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="geographic-scopes filter">
      <div v-b-toggle.geographicScopeOptions class='toggle'>
        <img class="globe icon" src="~/assets/globe.png">
        <h2 class='title'>{{ $t('geographicScope') }}</h2>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="geographicScopeOptions" class="options">
        <CheckboxFilter 
          :options="optionsHtmlAttrsByFilterType('geographicScopes')"
          :defaultOptionIds="filter.geographicScopeIds"
          v-on:newValue="updateFilter({type: 'geographicScopeIds', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="content-types filter">
      <div v-b-toggle.contentTypeOptions class='toggle'>
        <img class="icon" src="~/assets/content-type.png">
        <h2 class='title'>{{ $t('contentTypesFilter')}}</h2>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="contentTypeOptions" class="options">
        <CheckboxFilter 
          :options="optionsHtmlAttrsByFilterType('contentTypes')"
          :defaultOptionIds="filter.contentTypeIds"
          v-on:newValue="updateFilter({type: 'contentTypeIds', value: $event})"
        />
      </b-collapse>
    </div>

    <div class="issues filter">
      <div v-b-toggle.issuesOptions class='toggle'>
        <img class="icon" src="~/assets/issues.png">
        <h2 class='title'>{{ $t('issuesFilter') }}</h2>
        <span class='chevron up' aria-hidden="true"><b-icon icon="chevron-up"></b-icon></span>
        <client-only>
          <span class='chevron down' aria-hidden="true"><b-icon icon="chevron-down"></b-icon></span>
        </client-only>
      </div>
      <b-collapse id="issuesOptions" class="options">
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

<style>
.filters {
  padding-right: 30px;
  width: 30%;
}

.title {
  font-weight: bold;
  color: #000000;
}

.title.main {
  font-size: 24px;
  margin-bottom: 10px;
}

.filter .title {
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
  top: 0;
  right: 10px;
}

.chevron svg {
  stroke: black;
  stroke-width: 2;
}

.collapsed > .chevron.down,
.not-collapsed > .chevron.up {
  display: none;
}

.options {
  margin: 15px 0;
}

.options label {
  font-size: 18px;
  color: #000000;
}
</style>