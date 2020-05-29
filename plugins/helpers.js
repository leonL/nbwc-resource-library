import Vue from 'vue'

Vue.prototype.$removeDiacritics =str => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}