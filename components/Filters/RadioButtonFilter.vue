<template>
  <div class="radios">
    <b-form-radio v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionId" class="mb-3">
      {{ option.text }}
    </b-form-radio>      
  </div>
</template>

<script>
export default {
  name: 'RadioButtonFilter',

  props: {
    options: Array,
    defaultOptionId: String
  },

  data () {
    return {
      selectedOptionId: ""
    }
  },

  created: function() {
    this.selectedOptionId = this.defaultOptionId;
  },

  watch: {
    selectedOptionId: function (val, oldVal) {
      this.$emit('newValue', val);
    }
  }
}
</script>

<style scoped>
.radios {
  margin-left: 5px;
}
</style>