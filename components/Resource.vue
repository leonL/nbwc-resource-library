<template>
    <li>
        <span v-for="ct in contentTypes" :key="ct">
            {{ ct }}
        </span>
        <h3>{{ title }}</h3>
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
        contentTypes: {
            type: Array,
            required: true
        }
    }
}
</script>