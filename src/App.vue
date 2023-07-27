<template>
  <!-- <AutomobileExhibit></AutomobileExhibit> -->
  <!-- <StarArrange count="100"></StarArrange> -->
  <Acanthosphere></Acanthosphere>
</template>

<script>
import AutomobileExhibit from './components/AutomobileExhibit.vue';
import StarArrange from '@/components/starArrange.vue';
import Acanthosphere from '@/components/Acanthosphere.vue';
export default {
  name: 'App',
  components: { AutomobileExhibit, StarArrange, Acanthosphere },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
}
</style>
