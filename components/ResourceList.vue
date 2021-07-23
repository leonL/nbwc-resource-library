<template>
  <ul id="resources-list" class="resources">
    <Resource
      v-for="(resource) in resources"
      :key="resource.id"
      :resource="resource"
    />
  </ul>
</template>

<script>
import Resource from './Resource.vue';

export default {
  name: 'ResourceList',
  props: {
    resources: Array
  },
  components: {
    Resource
  }
}
</script>

<style scoped>

</style>
