<template>
  <div ref="dom"></div>
</template>
<script setup>
//物体自定义轨迹运动
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, camera, updateRenderWorld } = createThree();

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});

const ambient = new THREE.AmbientLight();
ambient.intensity = 5;
scene.add(ambient);

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, 0, 10),
  new THREE.Vector3(-5, 5, 5),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(5, -5, 5),
  new THREE.Vector3(10, 0, 10),
]);

const points = curve.getPoints(10);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
const curveObject = new THREE.Line(geometry, material);
scene.add(curveObject);

const coneGeometry = new THREE.ConeGeometry(0.2, 0.6, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(cone);

const params = { time: 0 };

console.log(curve.getPointAt(0.8), curve.getPointAt(0.9));
gsap.to(params, {
  time: 1,
  duration: 20,
  repeat: -1,
  onUpdate: () => {
    cone.position.copy(curve.getPointAt(params.time));
    const target = params.time + 0.001;
    if (target <= 1) {
      cone.lookAt(curve.getPointAt(target));
    }
  },
});
</script>
