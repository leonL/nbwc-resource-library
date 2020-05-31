<template>
    <li class="resource">
        <span v-if="paywall" class="paywall">PAYWALL</span>
        <a :href="links[`${$i18n.locale}`]" target="_blank">
            <h2 v-html="getTitleMarked()" class="rTitle"></h2>
        </a>
        <div v-html="getAccreditationHtml()"></div>
        <div>
            <h6 v-for="(gs, index) in geographicScopes" :key="gs" class="geo-scope">
                <span v-if="index > 0"> / </span>
                {{ gs }} 
            </h6>
        </div>
        <div class="content-types">
            <h6 v-for="(ct) in contentTypes" :key="ct" class="content-type">
                {{ ct }} 
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
        paywall: {
            type: Boolean,
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
        getTitle: function () {
            return this.titles[this.getPrimaryLanguageId()]
        },
        getPrimaryLanguageId: function() {
            return (this.language.id === "both") ? this.$i18n.locale : this.language.id
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
            return (this.isTextSearching) ? this.wrapMatchedWithMarkTag(this.getTitle()) : this.getTitle()   
        },
        getAuthorMarked: function() {
            return (this.isTextSearching) ? this.wrapMatchedWithMarkTag(this.author) : this.author   
        },
        getOrganizationMarked: function() {
            return (this.isTextSearching) ? this.wrapMatchedWithMarkTag(this.organization) : this.organization   
        },
        getPublicationMarked: function() {
            return (this.isTextSearching) ? this.wrapMatchedWithMarkTag(this.publication) : this.publication   
        },
        wrapMatchedWithMarkTag: function(text, search = this.searchRegx) {
            const ot = "<mark>", ct = "</mark>"
            let textMarked = text, counter = 0, markTagsOffset = (ot + ct).length
            const textWithoutDiacritics = this.$removeDiacritics(text)
            
            textWithoutDiacritics.replace(search, (match, offset) => {
                let totalOffset = offset + markTagsOffset * counter
                textMarked = textMarked.substr(0, totalOffset) + ot + 
                    textMarked.substr(totalOffset, match.length) + ct + 
                    textMarked.substr(totalOffset + match.length, textMarked.length -1)
                counter++
                return match
            })
            
            return textMarked
        },
        getAccreditationHtml: function() {
            const possibleAccreditations = [this.getAuthorMarked(), this.getOrganizationMarked(), this.getPublicationMarked()],
            bulletHtml = " <span>&#8226;</span> "
            let actualAccreditations = [],
            html = ""

            possibleAccreditations.forEach(pa => {
                if(pa) actualAccreditations.push(pa)
                return false
            })

            actualAccreditations.forEach((aa, index) => {
                if (index > 0) html += bulletHtml
                html += aa 
            })

            return html
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

.rTitle {
    font-size: 30px;
    font-weight: bold;
    line-height: normal;
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

.paywall {
    position: absolute;
    right: 0;
}

</style>