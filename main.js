import "./style.css";

import * as THREE from "three";

const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("static/textures/moon/texture.jpg")
});
const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// lights
const ambientLight = new THREE.AmbientLight("white", 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("white", 1.0);
pointLight.position.set(0, 1.5, 0);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(5);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const clock = new THREE.Clock();
clock.start();

// main render loop
function render() {
  requestAnimationFrame(render);

  // animate box
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.003;

  // light animation
  pointLight.position.x = 5 * Math.sin(clock.getElapsedTime());

  renderer.render(scene, camera);
}

// start rendering
render();
