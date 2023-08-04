<template>
  <div ref="dom"></div>
</template>
<script setup>
//物体自定义轨迹运动
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, camera, updateRenderWorld } = createThree();
camera.position.set(0, 10, -10);

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});
//创建平面
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: '#fff',
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

planeMesh.rotateX(-Math.PI / 2);

scene.add(planeMesh);

const ambient = new THREE.AmbientLight();
ambient.intensity = 5;

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, 0, 10),
  new THREE.Vector3(-5, 5, 5),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(5, -5, 5),
  new THREE.Vector3(10, 0, 10),
]);

scene.add(ambient);
</script>
