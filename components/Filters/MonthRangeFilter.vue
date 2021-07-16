<template>
  <div class="month-range">
    <MonthAndYearSelector 
      :label="'From'"
      v-on:newDate="newDateValue('fromDate', $event)"
    />
    <MonthAndYearSelector 
      :label="'To'"
      v-on:newDate="newDateValue('toDate', $event)"
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
          fromDate: null,
          toDate: null
        }
      };
    },

    methods: {
      newDateValue(rangeSegment, value) {
        this.monthRange[rangeSegment] = value; 

        if (this.isRangeValid()) {
          this.$emit('newValue', this.monthRange );
        }
        return true;
      },
      isRangeValid() {
        const r = this.monthRange;
        let isValid = false;
        if (r.fromDate === null || r.toDate === null) {
          isValid = false;
        } else if ( new Date(r.fromDate.year, r.fromDate.month) > new Date(r.toDate.year, r.toDate.month) ) {
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