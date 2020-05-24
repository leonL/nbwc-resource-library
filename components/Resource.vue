<template>
    <li>
        <span v-for="(ct, index) in contentTypes" :key="ct">
            <span v-if="index > 0"> / </span>
            {{ ct }} 
        </span>
        <a :href="link" target="_blank">
            <h3>{{ title }}</h3>
        </a>
        <span v-for="(gs, index) in geographicScopes" :key="gs">
            <span v-if="index > 0"> / </span>
            {{ gs }} 
        </span>
        <h5>{{ language }}</h5>
        <span v-for="(issue, index) in issues" :key="issue">
            <span v-if="index > 0"> / </span>
            {{ issue }} 
        </span>
    </li>
</template>

<script>
export default {
    name: 'Resource',
    props: {
        title: {
            type: String,
            required: true
        },
        link: {
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
            type: String,
            required: true
        },
        issues: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

li {
    list-style: none;
}

</style>