<template>
  <div class="date-range">
    <span class='label'>{{ label }}</span>
    <b-form-select v-model="month.selected" :options="month.options"></b-form-select>
    <b-form-select v-model="year.selected" :options="year.options"></b-form-select>
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
        month: {
          selected: null, 
          options: [
            { value: null, text: 'Month' },
            { value: 1, text: 'Jan' },
            { value: 2, text: 'Feb' },
            { value: 3, text: 'Mar' },
            { value: 4, text: 'Apr' },
            { value: 5, text: 'May' },
            { value: 6, text: 'June' },
            { value: 7, text: 'July' },
            { value: 8, text: 'Aug' },
            { value: 9, text: 'Sep' },
            { value: 10, text: 'Oct' },
            { value: 11, text: 'Nov' },
            { value: 12, text: 'Dec' },
          ]
        },
        year: {
          selected: null,
          options: [
            { value: null, text: 'Year' },
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
