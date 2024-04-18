import "/css/style.css";
import * as THREE from "three";
import * as loaderFunc from "../src/loader.ts";
import * as light from "../src/lights.ts";
import * as star from "../src/stars.ts";
import * as rocketRider from "../src/rocketRider.ts";
import * as bookPlanet from "../src/booksPlanet.ts";
import * as workPlanet from "../src/workPlanet.ts";
import * as art_Planet from "../src/artPlanet.ts";

console.log("Starting...");

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const canvas = document.querySelector("#bg") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Canvas resize
function resizeCanvas() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}
resizeCanvas(); // Initial call to resize canvas
window.addEventListener("resize", resizeCanvas); // Listen for window resize events

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// Lights
light.addAmbientLight(scene);

// Stars
Array(200).fill(0).forEach(() => star.addStar(scene));

// Camera movement
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    const moveSpeed = -0.01;
    camera.position.z = t * moveSpeed * 2;
    camera.position.x = t * moveSpeed * 0.01;
    camera.rotation.y = t * moveSpeed * 0.001;
    camera.position.y = t * moveSpeed * 0.1;
}
document.body.onscroll = moveCamera;
moveCamera();

// Load and create 3D models
const gltfPaths = [
    "../src/3d/rocket_rider.gltf",
    "../src/3d/booksPlanet.gltf",
    "../src/3d/workPlanet.gltf",
    "../src/3d/artPlanet.gltf"
];

loaderFunc.loadGLTFObjects(gltfPaths)
    .then((loadedObjects) => {
        const rocketRiderObj = new rocketRider.RocketRider(scene, loadedObjects[0], 5, -2, -8);
        const bookPlanetObj = new bookPlanet.BookPlanet(scene, loadedObjects[1], -8, 0, 42);
        const workPlanetObj = new workPlanet.WorkPlanet(scene, loadedObjects[2], 8, 3, 100);
        const artPlanetObj = new art_Planet.ArtkPlanet(scene, loadedObjects[3], -10, 5, 165);

        console.log("Models loaded successfully");

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            rocketRiderObj.Animate();
            bookPlanetObj.Animate();
            workPlanetObj.Animate();
            artPlanetObj.Animate();

            renderer.render(scene, camera);
        }
        animate();
    })
    .catch((error) => {
        console.error('An error occurred while loading GLTF files:', error);
    });
