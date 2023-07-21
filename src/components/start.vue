<template>
  <div ref="dom"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene } = createThree();

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});
</script>
