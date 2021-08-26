<template>
  <div class='year-range'>
    <b-form-input id="fromYear" :type="'number'" :number="true" v-on:change="updateFromYear"
      :min="earliestPublicationYear" :max="toYear" :value="fromYear"></b-form-input>
    <div class='emStop'> – </div>
    <b-form-input id="toYear" :type="'number'" :number="true" v-on:change="updateToYear"
      :min="fromYear" :max="currentYear" :value="toYear"></b-form-input>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'YearRangeFilter',

  computed: {
    ...mapGetters(['earliestPublicationYear', 'filter']),
    currentYear() {
      let today = new Date();
      return today.getFullYear();
    },
    fromYear() {
      let range = this.filter.yearPublishedRange,
        year = this.earliestPublicationYear;
      if (range !== null) year = range[0];
      return year;
    },
    toYear() {
      let range = this.filter.yearPublishedRange,
        year = this.currentYear;
      if (range !== null) year = range[1];
      return year;
    }
  },

  methods: {
    ...mapActions(['updateFilter']),
    updateFromYear(year) {
      if (year >= this.earliestPublicationYear) {
        this.updateFilter({type: 'yearPublishedRange', value: [year, this.toYear]})
      }
    },
    updateToYear(year) {
      if (year <= this.currentYear) {
        this.updateFilter({type: 'yearPublishedRange', value: [this.fromYear, year]})
      }
    }
  }
}
</script>

<style>
.year-range {
  display: flex;
}

.year-range input {
  width: 80px;
}

.year-range .emStop {
  padding: 0 10px;
  position: relative;
  top: 5px
}
</style>