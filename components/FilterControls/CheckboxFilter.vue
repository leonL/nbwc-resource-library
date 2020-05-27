<template>
    <b-dropdown :text="label" ref="dropdown" class="m-2">
        <b-dropdown-form>
            <b-form-checkbox v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionsIds" class="mb-3">
                {{ option.text }}
            </b-form-checkbox>
        </b-dropdown-form>
    </b-dropdown>
</template>

<script>
export default {
    name: 'CheckboxFilter',
    data () {
        return {
            selectedOptionsIds: []
        }
    },
    props: {
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    watch: {
        selectedOptionsIds: function (val, oldVal) {
            this.$emit('selectedOptionsChanged', val)
        }
    }
}
</script>