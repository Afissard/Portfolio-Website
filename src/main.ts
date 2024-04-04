import '/css/style.css';
import * as THREE from 'three';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#bg') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Function to resize the canvas
function resizeCanvas() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Initial call to resize canvas
resizeCanvas();
// Listen for window resize events
window.addEventListener('resize', resizeCanvas);


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
  
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  
    // moon.rotation.x += 0.005;
  
    // controls.update();
  
    renderer.render(scene, camera);
  }
  
  animate();