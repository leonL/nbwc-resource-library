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

  export default {
    name: 'MonthRangeFilter',

    data() {
      return {
        monthRange: {
          from: null,
          to: null
        }
      };
    },

    methods: {
      newDateValue(rangeSegment, value) {
        this.monthRange[rangeSegment] = value; 

        if (this.isRangeValid()) {
          this.emitNewValue(this.monthRange);
        } else {
          this.emitNewValue(null);
        }
      },
      emitNewValue(value) {
        this.$emit('newValue', value);
      },
      isRangeValid() {
        const r = this.monthRange;
        let isValid = false;
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

    components: {
      MonthAndYearSelector
    }
  };
</script>