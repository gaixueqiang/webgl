<template>
  <div ref="dom"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, camera } = createThree();

const lon2xyz = (R, longitude, latitude) => {
  let lon = (longitude * Math.PI) / 180;
  const lat = (latitude * Math.PI) / 180;
  lon = -lon;
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  return new THREE.Vector3(x, y, z);
};

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});

// const geometry = new THREE.SphereGeometry(10, 30, 30);
// const material = new THREE.MeshPhongMaterial({
//   emissive: '#fff',
// });

const geometry = new THREE.SphereGeometry(5, 30, 30);
const material = new THREE.MeshPhongMaterial({
  emissive: 'blue',
});

const map = new THREE.Mesh(geometry, material);

for (let i = 0; i < 100; i++) {
  const lightGeometry = new THREE.ConeGeometry(0.1, 2, 32);
  const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cone = new THREE.Mesh(lightGeometry, lightMaterial);
  const longitude = Math.random() * 360 - 180;
  const latitude = Math.random() * 180 - 90;
  const position = lon2xyz(5, longitude, latitude);
  cone.position.set(position.x, position.y, position.z);
  cone.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    position.normalize()
  );
  scene.add(cone);
}

scene.add(map);
camera.position.set(0, 5, 20);
</script>
