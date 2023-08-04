import { onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default (params = {}) => {
  const width = params.width || window.innerWidth;
  const height = params.height || window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(2, 2, 5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  let renderWorld = () => {};

  const updateRenderWorld = (fn) => {
    renderWorld = fn;
  };

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;

  window.onresize = () => {
    const width = params.width || window.innerWidth;
    const height = params.height || window.innerHeight;
    renderer.setSize(width, height);
    //更新宽高比
    camera.aspect = width / height;
    //更新相机矩阵
    camera.updateProjectionMatrix();
  };

  const render = () => {
    renderWorld();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  onMounted(() => {
    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(render);
  });

  scene.add(camera);

  return { scene, renderer, camera, updateRenderWorld };
};
