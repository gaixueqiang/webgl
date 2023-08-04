<template>
  <!-- <AutomobileExhibit></AutomobileExhibit> -->
  <!-- <StarArrange count="100"></StarArrange> -->
  <!-- <Acanthosphere></Acanthosphere> -->
  <!-- <Ball></Ball> -->
  <LineMove></LineMove>
</template>

<script>
import AutomobileExhibit from './components/AutomobileExhibit.vue';
import StarArrange from '@/components/starArrange.vue';
import Acanthosphere from '@/components/Acanthosphere.vue';
import Ball from '@/components/Ball.vue';
import LineMove from '@/components/LineMove.vue';
export default {
  name: 'App',
  components: { AutomobileExhibit, StarArrange, Acanthosphere, Ball, LineMove },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
}
</style>
