<template>
  <div class="month-range">
    <MonthAndYearSelector 
      :label="$t('from')"
      v-on:newDate="newDateValue('from', $event)"
    />
    <MonthAndYearSelector 
      :label="$t('to')"
      v-on:newDate="newDateValue('to', $event)"
    />
  </div>
</template>

<script>
import MonthAndYearSelector from './MonthAndYearSelector.vue';
import { mapActions } from 'vuex';


export default {
  name: 'MonthRangeFilter',

  data() {
    return {
      monthRange: { from: null, to: null }
    };
  },

  computed: {
    isRangeValid() {
      let r = this.monthRange, isValid = false;

      if (r.from === null || r.to === null) {
        isValid = false;
      } else if ( new Date(r.from.year, r.from.month) > new Date(r.to.year, r.to.month) ) {
        isValid = false;
      } else {
        isValid = true;
      }
      return isValid;
    }
  },

  methods: {
    ...mapActions(['updateFilter']),
    newDateValue(rangeSegment, value) {
      this.monthRange[rangeSegment] = value;
      let monthRangeValue = this.isRangeValid ? Object.assign({}, this.monthRange) : null,
        filterUpdateParams = {type: 'customDatePublishedRange', value: monthRangeValue};

      this.updateFilter(filterUpdateParams);
    }
  },

  components: {
    MonthAndYearSelector
  }
};
</script>

<style>
.month-range {
  position: relative;
  margin: -10px 0 0 30px;
}
</style>