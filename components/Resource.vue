<template>
    <li>
        <span v-for="(ct, index) in contentTypes" :key="ct">
            <span v-if="index > 0"> / </span>
            {{ ct }} 
        </span>
        <a :href="link" target="_blank">
            <h3>{{ title }}</h3>
        </a>
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
        }
    }
}
</script>

<style scoped>

li {
    list-style: none;
}

</style>