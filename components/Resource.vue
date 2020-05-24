<template>
    <li>
        <span v-for="(ct, index) in contentTypes" :key="ct">
            <span v-if="index > 0"> / </span>
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