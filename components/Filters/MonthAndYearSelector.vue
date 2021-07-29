<template>
  <div class="month-year-inputs">
    <span class='label'>{{ label }}</span>
    <b-form-select :options="monthOptions" v-model="monthSelected" v-on:change="selectChanged()"></b-form-select>
    <b-form-select :options="yearOptions" v-model="yearSelected" v-on:change="selectChanged()"></b-form-select>
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
      yearSelected: null,
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

  computed: {
    selectedValues() {
      return { month: this.monthSelected, year: this.yearSelected }
    },
    isValidDate() {
      let isValid = false;
      if (this.monthSelected === null || this.yearSelected === null) {
        isValid = false;
      } else {
        isValid = true;
      }
      return isValid;
    }
  },

  methods: {
    selectChanged() {
      let dateValues = this.isValidDate ? this.selectedValues : null;
      this.$emit('newDate', dateValues); 
    }
  }
}
</script>

<style scoped>
.month-year-inputs {
  display: flex;
  align-items: center;
}

.label {
  text-align: right;
  font-size: 12px;
  color: #000000;
  margin-right: 5px;
  min-width: 35px;
}

select {
  flex-grow: 1;
  display: inline;
  font-size: 10px;
}
</style>
