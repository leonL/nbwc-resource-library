<template>
    <h3>{{ title }}</h3>
</template>

<script>
export default {
    name: 'Resource',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>