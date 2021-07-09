<template>
  <div class='filters'>
    <h5>{{ $t('filters') }}</h5>

    <RadioButtonFilter 
      :label="$t('language')"
      :options="allLanguages.map(type => { return {text: type[locale.toUpperCase()], value: type.ID}})"
      :defaultOptionId="checkedLanguageId"
      v-on:newValue="newFilterValue('languageId', $event)"
    />
  </div>
</template>

<script>
  import CheckboxFilter from './FilterControls/CheckboxFilter.vue';
  import RadioButtonFilter from './FilterControls/RadioButtonFilter.vue';

  export default {
    name: 'filters',
    
    data () {
      const data = this.$store.state.data;
      return {
        allLanguages: data.allLanguages,
        checkedLanguageId: "BOTH"
      }
    },

    methods: {
      newFilterValue(filterField, newValue) {
        this.$emit('newFilterValue', {field: filterField, value: newValue} );
      }
    },
    
    computed: {
      locale: function() {
        return this.$i18n.locale;
      },
      upperCaseLocale: function() {
        return this.$i18n.locale.toUpperCase();
      }
    },

    components: {
      CheckboxFilter,
      RadioButtonFilter
    }
  };
</script>

<style scoped>
  .filters {
    width: 30%;
    /* border: 1px dotted black; */
  }
</style>
