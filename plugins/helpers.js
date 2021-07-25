import Vue from 'vue'

const removeDiacritics = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

Vue.prototype.$removeDiacritics = removeDiacritics;