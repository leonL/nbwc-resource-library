<template>
  <div>
    <b-form-checkbox v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionIds" class="mb-3">
      {{ option.text }}
    </b-form-checkbox>  
  </div>
</template>

<script>
export default {
  name: 'CheckboxFilter',

  props: {
    label: String,
    options: Array,
    defaultOptionIds: Array
  },

  data () {
    return {
      selectedOptionIds: [],
      caretRotation: 0
    }
  },

  created: function() {
    this.selectedOptionIds = this.defaultOptionIds;
  },

  watch: {
    selectedOptionIds: function (val, oldVal) {
      this.$emit('newValue', val);
    }
  }
}
</script>

<style scoped>

</style>