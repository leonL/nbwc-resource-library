<template>
    <b-dropdown text="Geographic Scope" ref="dropdown" class="m-2">
        <b-dropdown-form>
            <b-form-checkbox v-for="(option) in options" :key="option.value" :value="option.value" v-model="selected" class="mb-3">
                {{ option.text }}
            </b-form-checkbox>
        </b-dropdown-form>
    </b-dropdown>
</template>

<script>
export default {
    name: 'FilterControls',
    data () {
        return {
            selected: []
        }
    },
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    watch: {
        selected: function (val, oldVal) {
            this.$emit('optionsChanged', val)
        }
    }
}
</script>