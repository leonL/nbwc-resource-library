<template>
    <li class="resource">
        <div class="content-types">
            <h6 v-for="(ct) in contentTypes" :key="ct" class="content-type">
                {{ ct }} 
            </h6>
        </div>
        <a :href="links[`${$i18n.locale}`]" target="_blank">
            <h3 v-html="getTitleMarked()" class="tl"></h3>
        </a>
        <div>
            <span v-html="getAuthorMarked()"></span>
            <span>{{ organization }}</span>
            <span>{{ publication }}</span>
        </div>
        <div>
            <h6 v-for="(gs, index) in geographicScopes" :key="gs" class="geo-scope">
                <span v-if="index > 0"> / </span>
                {{ gs }} 
            </h6>
        </div>
        <span v-for="(issue, index) in issues" :key="issue">
            <span v-if="index > 0"> / </span>
            {{ issue }} 
        </span>
        <h5 v-if="language.id === 'both'">
             <a :href="links[`${otherLocale()}`]" target="_blank">
                {{ translationAvailableText() }}
            </a>
        </h5>
        <h5 v-else>
            {{ translationUnavailableText() }}
        </h5>
    </li>
</template>

<script>
export default {
    name: 'Resource',
    props: {
        titles: {
            type: Object,
            required: true
        },
        links: {
            type: Object,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        organization: {
            type: String,
            required: true
        },
        publication: {
            type: String,
            required: true
        },
        contentTypes: {
            type: Array,
            required: true
        },
        geographicScopes: {
            type: Array,
            required: true
        },
        language: {
            type: Object,
            required: true
        },
        issues: {
            type: Array,
            required: true
        },
        searchRegx: {
            type: RegExp,
            required: true
        },
        isTextSearching: {
            type: Boolean,
            required: true
        }  
    },
    methods: {
        otherLocale: function() {
            return (this.$i18n.locale === "en") ? "fr" : "en"
        },
        title: function () {
            var title = "",
            langID = this.language.id,
            locale = this.$i18n.locale,
            otherLocale = this.otherLocale()

            title = (langID === otherLocale) ? this.titles[otherLocale] : this.titles[locale]

            return title
        },
        translationUnavailableText: function () {
            var text = ""
            text = (this.language.id === 'en') ? this.$t('frUnavailable') : this.$t('enUnavailable')
            return text
        },
        translationAvailableText: function () {
            var text = ""
            text = (this.$i18n.locale === 'en') ? this.$t('frAvailable') : this.$t('enAvailable')
            return text
        },
        getTitleMarked: function () {
            let titleMarked = this.title()
            const titleWithoutDiacritics = this.$removeDiacritics(titleMarked)
            
            if (this.isTextSearching) {
                titleWithoutDiacritics.replace(this.searchRegx, (match, offset) => {
                    titleMarked = `${titleMarked.substr(0, offset)}<mark>${titleMarked.substr(offset, match.length)}</mark>${titleMarked.substr(offset + match.length, titleMarked.length -1)}`
                    return match
                })
            } 
            return titleMarked
        },
        getAuthorMarked: function() {
            let authorMarked = this.author
            const authorWithoutDiacritics = this.$removeDiacritics(authorMarked)
            
            if (this.isTextSearching) {
                authorWithoutDiacritics.replace(this.searchRegx, (match, offset) => {
                    authorMarked = `${authorMarked.substr(0, offset)}<mark>${authorMarked.substr(offset, match.length)}</mark>${authorMarked.substr(offset + match.length, authorMarked.length -1)}`
                    return match
                })
            } 
            return authorMarked
        }
    }
}
</script>

<style scoped>

li.resource {
    list-style: none;
    border-bottom: 0.9px #979797 solid;
    margin-top: 25px;
}

.content-types {
    position: relative;
    left: -5px;
}

.content-type {
    border-radius: 24.4px;
    background-color: #e8f8ff;
    padding: 5px 10px;
    text-align: center;
    display: inline;
    margin-right: 10px;
    line-height: 35px;
}

.geo-scope {
    display: inline;
}

</style>