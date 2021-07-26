<template>
  <li class="resource">
    <h1 class="title">
      <a :href="linkData.primaryUrl" v-html="linkData.primaryTitle" target="_blank"></a>
    </h1>
    <div class="accreditation">
      <div><span v-if="isAuthor">{{ resource.author }} &#8226;</span> {{ organizations }}</div>
      <div>
        <span class="publication">{{ publication }}</span> Published {{ publicationDateString }}
      </div>
    </div>


    <!-- <h5 v-if="isTranslation" class="translation-available">
      <a :href="linkData.translationUrl" target="_blank">
        {{ linkData.translationTitle }}
      </a>
    </h5>
    <span v-if="notes" v-html="$md.render(notes)" class="notes"></span>
    <h5>Geographic Scopes</h5>
    <h5>{{ tags.geographicScope }}</h5>
    <h5>Content Types</h5>
    <h6 v-for="contentType in tags.contentTypes" :key="contentType">
      {{ contentType }} 
    </h6>
    <h5>Issues</h5>
    <h6 v-for="issue in tags.issues" :key="issue">
      {{ issue }} 
    </h6> -->

  </li>
</template>

<script>
export default {
  name: 'Resource',

  props: {
    resource: Object
  },

  computed: {
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
    publicationMonthYear() {
      return {
        month: this.resource.publicationMonth,
        year: this.resource.publicationYear
      }
    },
    publicationDateString() {
      let {year, month} = this.publicationMonthYear, 
        publicationDate = new Date(year, month),
        dateFormat = { month: 'long', year: 'numeric' };

      if (this.resource.publicationDay !== null) {
        dateFormat.day = 'numeric';
        publicationDate.setDate(this.resource.publicationDay);
      }
      return new Intl.DateTimeFormat('en-US', dateFormat).format(publicationDate);
    },
    notes() {
      return this.resource[`${this.primaryLanguageId}Notes`];
    },
    tags() {
      return {
        geographicScope: this.resource[`${this.primaryLanguageId}GeographicScope`],
        contentTypes: this.resource[`${this.primaryLanguageId}ContentTypes`],
        issues: this.resource[`${this.primaryLanguageId}Issues`]
      }
    },
    publication() {
      let publication = this.resource[`${this.locale}Publication`];
      return publication;
    },
    isAuthor() {
      return this.resource.author.length > 0;
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

.title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 24px;
}

.title a {
  color: var(--primary-color);
}

.accreditation {
  color: #767676;
  font-size: 18px;
}

.publication {
  font-style: italic;
}

li.resource h5 {
  font-size: 18px;
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