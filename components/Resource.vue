<template>
  <li class="resource">

    <h1 class="title">
      <a :href="linkData.primaryUrl" v-html="linkData.primaryTitle" target="_blank"></a>
      <span class="pdf" v-if="resource.isPdf">PDF</span>
    </h1>

    <div class="accreditation">
      <div>
        <span v-if="isAuthor" v-html="resource.author + ' &#8226;'"></span> 
        <span v-html="organizations"></span>
      </div>
      <div>
        <span class="publication" v-html="publication"></span> 
        <span>Published {{ publicationDateString }}</span>
      </div>
    </div>

    <div class="notes" v-if="notes" v-html="$md.render(notes)"></div>

    <div v-if="isTranslation" class="translation">
      <span class="available">Available in</span> 
      <a :href="linkData.translationUrl" target="_blank">{{ translationLanguage }}</a>
    </div>

    <div class='tags'>
      <div class='tag-list'>
        <img class="icon" src="~/assets/globe.png">
        <div>
          <span :class="{ selected: geoScopeSelected }">{{ tags.geographicScope }}</span>
        </div>
      </div>
      <div class='tag-list' v-if="tags.contentTypes.length > 0">
        <img class="icon" src="~/assets/content-type.png">
        <div>
          <span v-for="(contentType, index) in contentTypesInAlphaOrder" :key="contentType.id" :class="{ selected: contentTypeSelected(contentType.id) }"> 
            {{ contentType.label }}<span v-if="index !== contentTypesInAlphaOrder.length - 1" class="semi-colon">;</span>
          </span>
        </div>
      </div>
      <div class='tag-list' v-if="tags.issues.length > 0">
        <img class="icon" src="~/assets/issues.png">
        <div>
          <span v-for="(issueType, index) in issuesInAlphaOrder" :key="issueType.id" :class="{ selected: issueTypeSelected(issueType.id) }"> 
            {{ issueType.label }}<span v-if="index !== issuesInAlphaOrder.length - 1" class="semi-colon">;</span>
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Resource',

  props: {
    resource: Object
  },

  computed: {
    ...mapGetters(['filter']),
    locale() {
      return this.$i18n.locale;
    },
    isTranslation() {
      return this.resource.languageId === 'BOTH';
    },
    primaryLanguageId() {
      let id = this.isTranslation ? this.locale : this.resource.languageId;
      return id.toLowerCase();
    },
    translationLanguageId() {
      let id = "";
      if (this.isTranslation) {
        id = this.primaryLanguageId === "en" ? "fr" : "en";
      }
      return id;
    },
    translationLanguage() {
      return this.translationLanguageId === "en" ? "English" : "French"; 
    },
    linkData() {
      let data = {
        primaryTitle: this.resource[`${this.primaryLanguageId}Title`],
        primaryUrl: this.resource[`${this.primaryLanguageId}Url`] 
      }
      if (this.isTranslation) {
        data.translationTitle = this.resource[`${this.translationLanguageId}Title`];
        data.translationUrl = this.resource[`${this.translationLanguageId}Url`];
      }
      return data;
    },
    organizations() {
      return this.resource[`${this.primaryLanguageId}Organizations`];
    },
    publicationDateString() {
      let yearPublished = this.resource.publicationYear,
        dateString = yearPublished;

      if (this.resource.publicationMonth !== null) {
        let publicationDate = new Date(yearPublished, this.resource.publicationMonth),
          dateFormat = { month: 'long', year: 'numeric' };

        if (this.resource.publicationDay !== null) {
          dateFormat.day = 'numeric';
          publicationDate.setDate(this.resource.publicationDay);
        }

        dateString = new Intl.DateTimeFormat('en-US', dateFormat).format(publicationDate);
      }

      return dateString;
    },
    notes() {
      return this.resource[`${this.primaryLanguageId}Notes`];
    },
    tags() {
      let contentTypeIds = this.resource.contentTypeIds,
        contentTypeLabels = this.resource[`${this.primaryLanguageId}ContentTypes`],
        contentTypeData = contentTypeLabels.map((label, i) => {
          return {id: contentTypeIds[i], label: label }
        });

      let issueIds = this.resource.issueIds,
        issueTypeLabels = this.resource[`${this.primaryLanguageId}Issues`],
        issueTypeData = issueTypeLabels.map((label, i) => {
          return {id: issueIds[i], label: label }
        });

      return {
        geographicScope: this.resource[`${this.primaryLanguageId}GeographicScope`],
        contentTypes: contentTypeData,
        issues: issueTypeData
      }
    },
    publication() {
      let publication = this.resource[`${this.locale}Publication`];
      return publication;
    },
    isAuthor() {
      return this.resource.author.length > 0;
    },
    geoScopeSelected() {
      let selectedGeoScopeIds = this.filter.geographicScopeIds,
        isSelected = false;

      if (selectedGeoScopeIds.length > 0) {
        isSelected = selectedGeoScopeIds.includes(this.resource.geographicScopeId) ? true : false;
      }

      return isSelected;
    },
    contentTypesInAlphaOrder() {
      let contentTypes = [...this.tags.contentTypes],
        inOrder = contentTypes.sort((a, b) => a.label.localeCompare(b.label, this.locale));
      return inOrder;
    },
    issuesInAlphaOrder() {
      let issues = [...this.tags.issues],
        inOrder = issues.sort((a, b) => a.label.localeCompare(b.label, this.locale));
      return inOrder;
    }
  },

  methods: {
    contentTypeSelected(id) {
      return this.filter.contentTypeIds.includes(id);
    },
    issueTypeSelected(id) {
      return this.filter.issueIds.includes(id);
    }
  }
}
</script>

<style scoped>

li.resource {
  list-style: none;
  border-bottom: 0.9px #979797 solid;
  margin-top: 25px;
  padding-bottom: 10px;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1.4rem;
}

.title .pdf {
  font-size: 11px;
  font-weight: 600;
  color: #5f5f5f;
  padding: 2px 5px;
  border-radius: 11px;
  background-color: #e2e2e2;
  position: relative;
  bottom: 4px;
}

.title a:not(:hover) {
  color: var(--primary-color);
  text-decoration: none;
}

.accreditation {
  color: #767676;
  font-size: 1.1rem;
}

.publication {
  font-style: italic;
}

.notes {
  margin-top: 20px;
  font-size: 18px;
  color: #000000
}

.translation {
  margin-top: 25px;
  font-size: 16px;
  color: #000000;
  font-weight: bold;
}

.tags {
  margin-top: 16px;
  color: #000000;
}

.tags .icon {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  position: relative;
  top: 4px;
}

.tags .selected {
  font-weight: bold;
}

.tags .selected .semi-colon {
  font-weight: normal;
}

.tag-list {
  display: flex;
}

@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
  }
}
</style>