<template>
  <div ref="dom"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, camera } = createThree();

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});

const geometry = new THREE.SphereGeometry(3, 30, 30);
const material = new THREE.MeshStandardMaterial({
  color: '#fff',
});

const ball = new THREE.Mesh(geometry, material);

scene.add(ball);
</script>
