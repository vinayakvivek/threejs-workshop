import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const createDonut = () => {
  const geometry = new THREE.TorusGeometry(1, 0.5, 16, 64);
  const color = new THREE.Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);
  const material = new THREE.MeshStandardMaterial({ color });
  const donut = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => 10 * (Math.random() - 0.5));
  const [rx, ry, rz] = Array(3)
    .fill()
    .map(() => 2 * Math.random());
  donut.position.set(x, y, z);
  donut.rotation.set(rx, ry, rz);
  donut.scale.setScalar(0.2);
  return donut;
};

const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();

// moon
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("static/textures/moon/texture.jpg"),
});
const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// donuts
const donuts = []
for (let i = 0; i < 100; ++i) {
  const donut = createDonut();
  scene.add(donut);
  donuts.push(donut);  
}

// lights
const ambientLight = new THREE.AmbientLight("white", 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1.0);
pointLight.position.set(0, 1.5, 0);
scene.add(pointLight);

const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 5);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
clock.start();

// main render loop
function render() {
  requestAnimationFrame(render);

  controls.update();

  // moon animation
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.003;

  // donuts animation
  for (const donut of donuts) {
    donut.rotation.x += 0.002;
    donut.rotation.y += 0.004;
  }

  // light animation
  pointLight.position.x = 5 * Math.sin(clock.getElapsedTime());

  renderer.render(scene, camera);
}

// start rendering
render();
