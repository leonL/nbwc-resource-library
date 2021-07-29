<template>
  <div>
    <b-form-checkbox v-for="(option) in options" :key="option.value" :value="option.value" class="mb-3"
      :checked="filter[type]" v-on:change="updateFilter({type: type, value: $event})">
      {{ option.text }}
    </b-form-checkbox>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CheckboxFilter',

  props: {
    type: String
  },

  computed: {
    ...mapGetters(['filter', 'filterOptions']),
    options() {
      return this.$mapFilterOptionsToHtmlAttrs(this.filterOptions[this.type], this.$i18n.locale);
    },
    currentValue() {
      return this.filter[this.type];
    }
  },

  methods: {
    ...mapActions(['updateFilter'])
  }

}
</script>

<style scoped>

</style>