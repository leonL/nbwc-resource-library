<template>
  <div>
    <span class='label'>{{ label }}</span>
    <b-form-select v-model="monthSelected" :options="monthOptions"></b-form-select>
    <b-form-select v-model="yearSelected" :options="yearOptions"></b-form-select>
  </div>
</template>

<script>
  export default {
    name: 'MonthAndYearSelector',

    props: {
      label: String
    },

    data() {
      return {
        monthSelected: null, 
        monthOptions: [
          { value: null, text: this.$t('month') },
          { value: 0, text: 'Jan' },
          { value: 1, text: 'Feb' },
          { value: 2, text: 'Mar' },
          { value: 3, text: 'Apr' },
          { value: 4, text: 'May' },
          { value: 5, text: 'June' },
          { value: 6, text: 'July' },
          { value: 7, text: 'Aug' },
          { value: 8, text: 'Sep' },
          { value: 9, text: 'Oct' },
          { value: 10, text: 'Nov' },
          { value: 11, text: 'Dec' },
        ],
        yearSelected: null,
        yearOptions: [
          { value: null, text: this.$t('year') },
          { value: 2014, text: '2014' },
          { value: 2015, text: '2015' },
          { value: 2016, text: '2016' },
          { value: 2017, text: '2017' },
          { value: 2018, text: '2018' },
          { value: 2019, text: '2019' },
          { value: 2020, text: '2020' },
          { value: 2021, text: '2021' }
        ]
      }
    },

    methods: {
      isValidDate() {
        let isValid = false;
        if (this.monthSelected === null || this.yearSelected === null) {
          isValid = false;
        } else {
          isValid = true;
        }
        return isValid;
      },
      newValidDate() {
        this.$emit('newDate', { month: this.monthSelected, year: this.yearSelected });
      }
    },
    
    watch: {
      monthSelected: function (val, oldVal) {
        if (this.isValidDate()) this.newValidDate();
      },
      yearSelected: function (val, oldVal) {
        if (this.isValidDate()) this.newValidDate();
      }
    }
  }
</script>

<style scoped>
  .label {
    font-size: 14px;
  }

  select {
    display: inline;
    width: 35%;
    font-size: 10px;
  }
</style>
