<template>
    <li>
        <span v-for="(ct, index) in contentTypes" :key="ct">
            <span v-if="index > 0"> / </span>
            {{ ct }} 
        </span>
        <a :href="links[`${$i18n.locale}`]" target="_blank">
            <h3>{{ title() }}</h3>
        </a>
        <span v-for="(gs, index) in geographicScopes" :key="gs">
            <span v-if="index > 0"> / </span>
            {{ gs }} 
        </span>
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
        }
    }
}
</script>

<style scoped>

li {
    list-style: none;
}

</style>