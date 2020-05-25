<template>
    <b-dropdown text="Geographic Scope" ref="dropdown" class="m-2">
        <b-dropdown-form>
            <b-form-checkbox v-for="(option) in options" :key="option" class="mb-3">
                {{ option.label }}
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