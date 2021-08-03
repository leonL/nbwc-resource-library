<template>
  <div>
    <b-form-checkbox v-for="option in options" :key="option.value" :value="option.value" class="mb-3"
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
    upperCaseLocale() {
      return this.$i18n.locale.toUpperCase();
    },
    options() {
      let optionData = [...this.filterOptions[this.type]];

      if (this.type === 'contentTypeIds') {
        optionData = optionData.sort((a, b) => {
          let aText = a[this.upperCaseLocale],
            bText = b[this.upperCaseLocale];
          return aText.localeCompare(bText, this.$i18n.locale);       
        });
      }

      return this.$mapFilterOptionsToHtmlAttrs(optionData, this.$i18n.locale);
    }
  },

  methods: {
    ...mapActions(['updateFilter'])
  }

}
</script>

<style scoped>

</style>