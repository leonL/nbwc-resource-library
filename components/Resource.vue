<template>
  <li class="resource">
    <h2 class="rTitle">
      <a :href="primaryUrl" 
        v-html="primaryTitle"
        target="_blank">
      </a>
    </h2>
    <h5 v-if="translationLanguageId" class="translation-available">
      <a :href="translationUrl" target="_blank">
        {{ translationTitle }}
      </a>
    </h5>
    <h5>{{ author }}</h5>
    <h5>{{ organizations }}</h5>
    <h5>{{ publication }}</h5>
    <h5>{{ publicationDateString }}</h5>
    <span v-if="notes" v-html="$md.render(notes)" class="notes"></span>

  </li>
</template>

<script>
import { mapGetters } from 'vuex';
import apiConsts from '@/store/apiConstants.js'
export default {
  name: 'Resource',

  props: {
    resource: Object
  },

  computed: {
    fieldNames() {
      return apiConsts.resourceFieldNames;
    },
    locale() {
      return this.$i18n.locale;
    },
    languageId() {
      return this.resource[this.fieldNames.languageId][0];
    },
    primaryLanguageId() {
      let id = this.languageId === "BOTH" ? this.locale : this.languageId;
      return id.toUpperCase();
    },
    translationLanguageId() {
      let id = false;
      if (this.languageId === "BOTH") {
        id = this.primaryLanguageId === "EN" ? "FR" : "EN";
      }
      return id;
    },
    primaryTitle() {
      return this.resource[this.fieldNames.title(this.primaryLanguageId)]
    },
    translationTitle() {
      let title = false;
      if (this.translationLanguageId) title = this.resource[this.fieldNames.title(this.translationLanguageId)];
      return title;
    },
    isPdf() {
      let documentFieldName = this.fieldNames.document(this.primaryLanguageId), 
        isDoc = false;
      if (this.resource[documentFieldName]) isDoc = true;
      return isDoc;
    },
    primaryUrl() {
      let documentField = this.fieldNames.document(this.primaryLanguageId),
        linkUrlField = this.fieldNames.link(this.primaryLanguageId);
      return this.isPdf ? this.resource[documentField][0].url : this.resource[linkUrlField];
    },
    translationUrl() {
      let url = false;
      if (this.translationLanguageId) {
        let documentField = this.fieldNames.document(this.translationLanguageId),
          linkUrlField = this.fieldNames.link(this.translationLanguageId);
        url = this.isPdf ? this.resource[documentField][0].url : this.resource[linkUrlField];
      } 
      return url;
    },
    author() {
      return this.resource[this.fieldNames.author];
    },
    organizations() {
      let fieldName = this.fieldNames.organizations(this.primaryLanguageId),
        organizations = [];
      if (this.hasField(fieldName)) organizations = this.resource[fieldName];
      return organizations.join(', ');
    },
    publication() {
      let fieldName = this.fieldNames.publication(this.primaryLanguageId),
        publication = "";
      if (this.hasField(fieldName)) publication = this.resource[fieldName][0];
      return publication;
    },
    publicationDay() {
      let fieldName = this.fieldNames.publicationDay,
        day = false;
      if (this.hasField(fieldName)) day = this.resource[fieldName];
      return day;
    },
    publicationMonthYear() {
      return {
        month: this.resource[this.fieldNames.publicationMonth] - 1,
        year: this.resource[this.fieldNames.publicationYear]
      }
    },
    publicationDateString() {
      let {year, month} = this.publicationMonthYear, 
        publicationDate = new Date(year, month),
        dateFormat = { month: 'long', year: 'numeric' };

      if (this.publicationDay) {
        dateFormat.day = 'numeric';
        publicationDate.setDate(this.publicationDay);
      }
      return new Intl.DateTimeFormat('en-US', dateFormat).format(publicationDate);
    },
    notes() {
      let notes = false,
        fieldName = this.fieldNames.notes(this.primaryLanguageId);

      if (this.hasField(fieldName) && this.resource[fieldName].length > 0) notes = this.resource[fieldName];
      return notes;
    }
  },

  methods: {
    hasField(fieldName) {
      return this.resource.hasOwnProperty(fieldName);
    }
  }
}
</script>

<style scoped>

li.resource {
  list-style: none;
  border-bottom: 0.9px #979797 solid;
  margin-top: 25px;
  padding-bottom: 28px;
}

li.resource h5 {
  font-size: 18px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  max-width: 85%;
}

.notes {
  font-size: 16px;
  color: #767676;
}

.tags {
  margin-top: 18px;
}

.pills {
  position: relative;
  left: -5px;
  margin-bottom: 5px;
}

.pills .label {
  display: inline;
  margin-right: 20px;
  color: #767676;
}

.pills h6 {
  font-size: 16px;
  font-weight: 600;
  border-radius: 24.4px;
  background-color: #e8f8ff;
  padding: 0 10px;
  text-align: center;
  display: inline;
  margin-right: 10px;
  line-height: 25px;
  color: #000000;
  display: inline-block;
}

.paywall {
  position: absolute;
  right: 0;
  font-weight: bold;
  background-color: #fed8b1;
  padding: 5px;
  color: black;
  font-size: 14px;
}

@media screen and (max-width: 767px) {
  .pills .label {
    margin-right: 0px;
    margin-left: 8px;
  }

  .title {
    font-size: 25px;
  }
}

</style>