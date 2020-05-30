<template>
    <b-dropdown :text="label" ref="dropdown">
        <b-dropdown-form>
            <b-form-radio v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionId" class="mb-3">
                {{ option.text }}
            </b-form-radio>
        </b-dropdown-form>
    </b-dropdown>
</template>

<script>
export default {
    name: 'FilterControl',
    data () {
        return {
            selectedOptionId: this.defaultSelectedOptionId
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
        defaultSelectedOptionId: {
            type: String,
            required: true
        }
    },
    watch: {
        selectedOptionId: function (val, oldVal) {
            this.$emit('selectedOptionsChanged', val)
        }
    }
}
</script>