<template>
  <!-- <AutomobileExhibit></AutomobileExhibit> -->
  <StarArrange count="100"></StarArrange>
</template>

<script>
import AutomobileExhibit from './components/AutomobileExhibit.vue';
import StarArrange from '@/components/starArrange.vue';
export default {
  name: 'App',
  components: { AutomobileExhibit, StarArrange },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
}
</style>
