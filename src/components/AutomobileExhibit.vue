<template>
  <div ref="dom"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene } = createThree(); //scene
const loader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('../assets/gltf');
// loader.setDRACOLoader(dracoLoader);
onMounted(() => {
  const grid = new THREE.GridHelper(20, 20);
  grid.material.opacity = 0.4;
  grid.material.transparent = true;
  loader.load('./assets/gltf/bmw/scene.gltf', (gltf) => {
    console.log(gltf);
    const bwm = gltf.scene;

    bwm.traverse((child) => {
      if (child.isMesh) {
        console.log(child);
      }
    });
    scene.add(gltf.scene);
  });
  // const plan = new THREE.PlaneGeometry(20, 20);
  // const material = new THREE.MeshPhysicalMaterial({
  //   color: '#049ef4',
  //   side: THREE.DoubleSide,
  //   roughness: 0,
  // });

  // const mesh = new THREE.Mesh(plan, material);

  const light = new THREE.AmbientLight();

  scene.add(light, grid);

  const light1 = new THREE.DirectionalLight();
  light1.position.set(0, 0, 10);
  const light2 = new THREE.DirectionalLight();
  light2.position.set(0, 0, -10);

  const light3 = new THREE.DirectionalLight();
  light3.position.set(10, 0, 0);
  const light4 = new THREE.DirectionalLight();
  light4.position.set(-10, 0, 0);

  const light5 = new THREE.DirectionalLight();
  light5.position.set(0, 10, 0);
  const light6 = new THREE.DirectionalLight();
  light6.position.set(0, -10, 0);

  scene.add(light1, light2, light3, light4, light5, light6);

  scene.background = new THREE.Color('#CCC');
  scene.environment = new THREE.Color('#CCC');
  dom.value.appendChild(renderer.domElement);
});
</script>
<style></style>
