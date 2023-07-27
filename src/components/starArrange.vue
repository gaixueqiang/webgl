<template>
  <div ref="dom"></div>
  <button style="position: fixed; top: 20px; right: 20px" @click="handleClick">
    click
  </button>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, camera } = createThree();

const props = defineProps(['count']);
onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});
const geometry = new THREE.SphereGeometry(0.1, 30, 30);
const material = new THREE.MeshPhongMaterial({
  emissive: '#fff',
});
const starInstance = new THREE.InstancedMesh(geometry, material, props.count);
const start = [];
for (let i = 0; i < props.count; i++) {
  const x = Math.random() * 100 - 50;
  const y = Math.random() * 100 - 50;
  const z = Math.random() * 100 - 50;
  const matrix = new THREE.Matrix4();
  const vector = new THREE.Vector3(x, y, z);
  start.push(vector);
  matrix.setPosition(vector);
  starInstance.setMatrixAt(i, matrix);
}

const heartShape = new THREE.Shape();
heartShape.moveTo(25, 25);
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

const restart = (params) => {
  gsap.to(params, {
    time: 0,
    duration: 1,
    onUpdate: () => {
      for (let i = 0; i < props.count; i++) {
        const vector2 = heartShape.getPoint(i / 100);
        vector2.set(vector2.x * 0.1, vector2.y * 0.1);
        const matrix = new THREE.Matrix4();
        //起点位置加 终点与起点差值乘当前时间
        const x = start[i].x + (vector2.x - start[i].x) * params.time;
        const y = start[i].y + (vector2.y - start[i].y) * params.time;
        const z = start[i].z + (0 - start[i].z) * params.time;
        matrix.setPosition(x, y, z);
        starInstance.setMatrixAt(i, matrix);
      }
      starInstance.instanceMatrix.needsUpdate = true;
    },
  });
};

const meshHeart = (params) => {
  gsap.to(params, {
    time: 1,
    duration: 1,
    onUpdate: () => {
      for (let i = 0; i < props.count; i++) {
        const vector2 = heartShape.getPoint(i / 100);
        vector2.set(vector2.x * 0.1, vector2.y * 0.1);
        const matrix = new THREE.Matrix4();
        const x = start[i].x + (vector2.x - start[i].x) * params.time;
        const y = start[i].y + (vector2.y - start[i].y) * params.time;
        const z = start[i].z + (0 - start[i].z) * params.time;
        matrix.setPosition(x, y, z);
        starInstance.setMatrixAt(i, matrix);
      }
      starInstance.instanceMatrix.needsUpdate = true;
    },
  });
};

const params = {
  time: 0,
};
const handleClick = () => {
  params.time ? restart(params) : meshHeart(params);
};
scene.add(starInstance);
camera.position.set(0, 5, -30);
</script>
