<template>
  <div ref="dom"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene } = createThree(); //scene

onMounted(() => {
  const grid = new THREE.GridHelper(20, 20);
  grid.material.opacity = 0.4;
  grid.material.transparent = true;
  // const plan = new THREE.PlaneGeometry(20, 20);
  // const material = new THREE.MeshPhysicalMaterial({
  //   color: '#049ef4',
  //   side: THREE.DoubleSide,
  //   roughness: 0,
  // });

  // const mesh = new THREE.Mesh(plan, material);

  const light = new THREE.AmbientLight();

  scene.add(light, grid);

  scene.background = new THREE.Color('#CCC');
  scene.environment = new THREE.Color('#CCC');
  dom.value.appendChild(renderer.domElement);
});
</script>
<style></style>
