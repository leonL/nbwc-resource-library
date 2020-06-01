<template>
    <b-dropdown :text="label" ref="dropdown">
        <b-dropdown-form>
            <b-form-checkbox v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionIds" class="mb-3">
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
            selectedOptionIds: []
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
        },
        defaultSelectedOptionIds: {
            type: Array,
            required: true
        }
    },
    watch: {
        selectedOptionIds: function (val, oldVal) {
            this.$emit('selectedOptionsChanged', val)
        }
    },
    beforeUpdate: function() {
        this.selectedOptionIds = this.defaultSelectedOptionIds
    }
}
</script>