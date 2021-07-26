<template>
  <li class="resource">

    <h1 class="title">
      <a :href="linkData.primaryUrl" v-html="linkData.primaryTitle" target="_blank"></a>
      <span class="pdf" v-if="resource.isPdf">PDF</span>
    </h1>

    <div class="accreditation">
      <div><span v-if="isAuthor">{{ resource.author }} &#8226;</span> {{ organizations }}</div>
      <div>
        <span class="publication">{{ publication }}</span> Published {{ publicationDateString }}
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
        <div>{{ tags.geographicScope }}</div>
      </div>
      <div class='tag-list' v-if="tags.contentTypes.length > 0">
        <img class="icon" src="~/assets/content-type.png">
        <div>{{ tags.contentTypes }}</div>
      </div>
      <div class='tag-list' v-if="tags.issues.length > 0">
        <img class="icon" src="~/assets/issues.png">
        <div>{{ tags.issues }}</div>
      </div>
    </div>
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
        contentTypes: this.resource[`${this.primaryLanguageId}ContentTypes`].join(', '),
        issues: this.resource[`${this.primaryLanguageId}Issues`].join(', ')
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
  padding-bottom: 10px;
}

.title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 24px;
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

.title a {
  color: var(--primary-color);
  text-decoration: none;
}

.accreditation {
  color: #767676;
  font-size: 18px;
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

.tag-list {
  display: flex;
}

@media screen and (max-width: 767px) {
  .title {
    font-size: 20px;
  }
}
</style>