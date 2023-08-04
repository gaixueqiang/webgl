<template>
  <div ref="dom"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import createThree from '@/hooks/createThree';
const dom = ref(null);
const { renderer, scene, updateRenderWorld } = createThree();
const world = new CANNON.World();
world.gravity.set(0, -10, 0);

onMounted(() => {
  dom.value.appendChild(renderer.domElement);
});

const light = new THREE.AmbientLight(0x404040, 10);
scene.add(light);

const geometry = new THREE.SphereGeometry(0.3, 30, 30);
const material = new THREE.MeshStandardMaterial({
  color: 'red',
});
const ball = new THREE.Mesh(geometry, material);
scene.add(ball);
ball.position.set(0, 10, 0);

const ballShape = new CANNON.Sphere(0.3);
const ballBody = new CANNON.Body({
  mass: 1,
  shape: ballShape,
  position: new CANNON.Vec3(0, 10, 0),
});
world.addBody(ballBody);

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 'green',
  // side: THREE.DoubleSide,
});

const planeShape = new CANNON.Plane(50, 50);
const planeBody = new CANNON.Body({ mass: 0, shape: planeShape });
planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(planeBody);

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

const clock = new THREE.Clock();

const renderWorld = () => {
  const detail = clock.getDelta();
  world.step(detail);
  if (ball) {
    ball.position.copy(ballBody.position);
    ball.quaternion.copy(ballBody.quaternion);
  }
};

window.addEventListener('click', () => {
  ballBody.applyForce(new CANNON.Vec3(-100, 0, 10));
});

updateRenderWorld(renderWorld);
</script>
