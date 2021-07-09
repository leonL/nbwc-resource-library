<template>
  <div class="filter" v-bind:class={label}>
    <div v-b-toggle.options class='toggle' v-on:click="flipCaret()">
      <h5>{{ label }}</h5>
      <span class='caret'>
        <b-icon icon="chevron-up" :rotate="caretRotation" font-scale="1.2" aria-hidden="true"></b-icon>
      </span>
    </div>
    <b-collapse id="options">
      <b-form-radio v-for="(option) in options" :key="option.value" :value="option.value" v-model="selectedOptionId" class="mb-3">
        {{ option.text }}
      </b-form-radio>      
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'RadioButtonFilter',

  props: {
    label: String,
    options: Array,
    defaultOptionId: String
  },

  data () {
    return {
      selectedOptionId: "here",
      caretRotation: 0
    }
  },

  methods: {
    flipCaret: function() {
      this.caretRotation = this.caretRotation === 0 ? 180 : 0;
      return true;
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
  .toggle {
    position: relative;
    /* border: 1px solid green; */
  }

  .caret {
    position: absolute;
    bottom: 0;
    right: 10px;
    /* border: 1px dotted blue; */
  }
</style>