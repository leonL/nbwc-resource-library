<template>
    <b-dropdown text="Geographic Scope" ref="dropdown" class="m-2">
        <b-dropdown-form>
            <b-form-checkbox value="orange" v-on:click="$emit('enlarge-text', 0.1)">Orange</b-form-checkbox>
            <b-form-checkbox v-for="(option) in options" :key="option.value" class="mb-3">
                {{ option.text }}
            </b-form-checkbox>
        </b-dropdown-form>
    </b-dropdown>
</template>

<script>
export default {
    name: 'FilterControls',
    props: {
        options: {
            type: Array,
            required: true
        }
    }
}
</script>