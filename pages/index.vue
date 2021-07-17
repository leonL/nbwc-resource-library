<template>
  <div class='library'>
    <div class='titles'>
      <h2 class="page-title">
          {{ $t('homeTitle') }} 
      </h2>
      <h3 class="subtitle" v-html="$md.render(subtitleTexts[$i18n.locale])" ></h3>
    </div>

    <div class='ui'>
      <Filters 
        :defaultValues="filterModelDefaults"
        v-on:newFilterValue="updateFilterModel($event.field, $event.value)" 
      />

      <div class='index'>
        <b-form-input v-model="searchInputText" :placeholder="$t('searchPlaceholder')" debounce="500" 
          class="search" :aria-label="$t('searchPlaceholder')"></b-form-input>

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

        <ul id="resources-list" class="resources">
          <Resource
            v-for="(resource, index) in pageResources()"
            :index="index"
            :key="resource.id"
            :language="{id: resource['LANGUAGE ID'][0].toLowerCase(), label: resource[`LANGUAGE ${upperCaseLocale}`][0]}" 
            :titles="{en: resource['TITLE EN'], fr: resource['TITLE FR']}"
            :links="{en: getLink(resource, 'EN'), fr: getLink(resource, 'FR')}"
            :author="getAuthor(resource)"
            :organization="getOrganization(resource)"
            :publication="getPublication(resource)"
            :publicationDateValues="getPublicationDateValues(resource)"
            :contentTypes="resource[`CONTENT TYPES ${upperCaseLocale}`]" 
            :geographicScopes="resource[`GEOGRAPHIC SCOPE ${upperCaseLocale}`]" 
            :issues="resource[`ISSUES ${upperCaseLocale}`]"
            :paywall="getPaywall(resource)"
            :paywallHelpText="getPaywallText()"
            :searchRegx="getSearchRegx()"
            :isTextSearching="isTextSearching()"
            :notes="{en: getNotes(resource, 'en'), fr: getNotes(resource, 'fr')}"
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
    </div>
  </div>
</template>

<script>
import Filters from '@/components/Filters.vue';
import Resource from '@/components/Resource.vue';

export default {
  data () {
    const data = this.$store.state.data
    return {
      resources: data.resources,
      filterModelDefaults: {
        languageId: "BOTH",
        geographicScopeIds: [],
        contentTypeIds: [],
        monthPublishedRange: null,
        issueIds: [],
      },
      filterModel: {},
      searchInputText: "",
      upperCaseLocale: this.$i18n.locale.toUpperCase(),
      paywallTexts: { en: data.text[0]['HELP:PAYWALL'], fr: data.text[1]['HELP:PAYWALL'] },
      subtitleTexts: { en: data.text[0]['HOME:SUBTITLE'], fr: data.text[1]['HOME:SUBTITLE'] },
      currentPage: 1,
      resourcesPerPage: 10
    }
  },

  methods: {
    filterResources() {
      const model = this.filterModel;
      let filteredResources = [...this.resources];

      if (model.languageId !== "BOTH") {
        filteredResources = filteredResources.filter(r => {
          const rLangId = r['LANGUAGE ID'][0]
          return rLangId === "BOTH" || rLangId === model.languageId 
        })
      }

      if (model.geographicScopeIds.length) {
        filteredResources = filteredResources.filter(r => {
          const rGeoScopeId = r['GEOGRAPHIC SCOPE ID'][0]
          return model.geographicScopeIds.includes(rGeoScopeId)
        }) 
      }

      if (model.contentTypeIds.length) {
        filteredResources = filteredResources.filter(r => {
          return r['CONTENT TYPE IDS'].some(id => {
            return model.contentTypeIds.includes(id)
          })
        })
      }

      if (model.issueIds.length) {
        filteredResources = filteredResources.filter(r => {
          return r['ISSUE IDS'].some(id => {
            return model.issueIds.includes(id)
          })
        })
      }

      if (model.monthPublishedRange !== null) {
        let range = model.monthPublishedRange,
          fromDate = new Date(range.from.year, range.from.month),
          toDate = new Date(range.to.year, range.to.month);
        filteredResources = filteredResources.filter(r => {
          let publicationDate = this.getPublicationMonth(r);
          return (publicationDate >= fromDate && publicationDate <= toDate);
        })
      }

      if(this.isTextSearching()) {
        let searchRegx = this.getSearchRegx()

        filteredResources = filteredResources.filter(r => {
          let titleLanguage = r['LANGUAGE ID'][0]
          if (titleLanguage === 'BOTH') titleLanguage = this.upperCaseLocale 

          let titleWithoutDiacritics = this.$removeDiacritics(this.getTitle(r, titleLanguage)), 
          authorWithoutDiacritics = this.$removeDiacritics(this.getAuthor(r)),
          organizationWithoutDiacritics = this.$removeDiacritics(this.getOrganization(r)),
          publicationWithoutDiacritics = this.$removeDiacritics(this.getPublication(r)),
          keyWords = `${titleWithoutDiacritics} ${authorWithoutDiacritics} ${organizationWithoutDiacritics} ${publicationWithoutDiacritics}`

          return searchRegx.test(keyWords)
        })
      }     

      return filteredResources
    },
    pageResources() {
      return this.filterResources().slice(...this.currentPageIndexRange)
    },
    getSearchRegx() {
      return new RegExp(this.$removeDiacritics(this.searchInputText.trim()), 'gi')
    },
    getTitle(resource, locale = this.upperCaseLocale) {
      let title = '',
      propertyName = `TITLE ${locale}`

      if (resource.hasOwnProperty(propertyName)) {
        title = resource[propertyName]
      }
      return title
    },
    getLink(resource, locale) {
      let link = '',
        pdfPropertyName = `DOCUMENT ${locale}`,
        linkPropertyName = `LINK ${locale}`

      if (resource.hasOwnProperty(pdfPropertyName)) {
        link = resource[pdfPropertyName][0].url
      } else {
        link = resource[linkPropertyName]
      }

      return link
    },
    getOrganization(resource, locale = this.upperCaseLocale) {
      let organization = '',
      propertyName = `ORGANIZATION ${locale}` 

      if (resource.hasOwnProperty(propertyName)) {
        organization = resource[propertyName][0]
      }
      return organization
    },
    getPublication(resource, locale = this.upperCaseLocale) {
      let publication = '',
      propertyName = `PUBLICATION ${locale}` 

      if (resource.hasOwnProperty(propertyName)) {
        publication = resource[propertyName][0]
      }
      return publication
    },
    getPublicationMonth(resource) {
      return new Date(resource['PUBLICATION YEAR'], (resource['PUBLICATION MONTH'] - 1) || 0);
    },
    getPublicationDateValues(resource) {
      let dayPropName = 'PUBLICATION DAY',
        values = { 
          year: resource['PUBLICATION YEAR'],
          month: (resource['PUBLICATION MONTH'] - 1 || 0),
        };
      if (resource.hasOwnProperty(dayPropName)) values.day = resource[dayPropName];
      return values;
    },
    getAuthor(resource) {
      return resource['AUTHOR'] || ""
    },
    getPaywall(resource) {
      return resource['PAYWALL'] || false
    },
    getPaywallText() {
      return this.paywallTexts[this.$i18n.locale]
    },
    getNotes(resource, lang) {
      const upperCaseLang = lang.toUpperCase()
      return resource[`NOTES ${upperCaseLang}`] || "" 
    },
    isTextSearching() {
      return this.searchInputText.trim() ? true : false
    },
    updateFilterModel(filterType, newfilterValue) {
      let model = this.filterModel;
      model[filterType] = newfilterValue;
      this.currentPage = 1;
      this.$forceUpdate();
      return true;
    },
    resetFilterModel() {
      this.filterModel = this.filterModelDefaults;
      return true
    }
  },

  computed: {
    currentPageIndexRange() {
      let rangeEnd = this.resourcesPerPage * this.currentPage,
        rangeStart = rangeEnd - this.resourcesPerPage;
      return [rangeStart, rangeEnd];
    },
    totalResourcesCount() {
      return this.filterResources().length;
    },
    pageResorcesCount() {
      return this.pageResources().length;
    }
  },

  created: function() {
    this.resetFilterModel();
  },

  components: {
    Filters,
    Resource
  }
}
</script>

<style>
.ui {
  display: flex;
}

.index {
  width: 70%;
  /* border: 1px solid red; */
}

.subtitle {
  font-size: 24px;
  color: #767676;
  margin-bottom: 65px;
}

input.search {
  margin-top: 0.5rem;
  max-width: 500px;
}

.filter-controls {
  margin-bottom: 15px;
}

.clear-filters {
  margin-left: 10px;
  text-decoration: underline;
  color: #000000;
}

.clear-filters:hover {
  cursor: pointer;
}

.resource-count {
  font-size: 15px;
  font-weight: 600;
}

.resources {
  padding: 0;
  position: relative;
}

ul.resources li:first-child {
  margin-top: 10px;
}

mark {
  padding: 0px;
}

.page-title {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 15px;
}

@media screen and (max-width: 767px) {
  .page-title {
    font-size: 25px;
  }

  .subtitle {
    font-size: 13px;
    margin-bottom: 10px;
  }
}
</style>
