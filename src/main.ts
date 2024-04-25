// import * as THREE from "three";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as light from "../src/lights.ts";
import * as star from "../src/stars.ts";
import { ModelTemplate } from "./modelTemplate";


console.log("Starting...");

// Setup
const scene = new Scene();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const canvas = document.querySelector("#bg") as HTMLCanvasElement;
const renderer = new WebGLRenderer({
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

// 3D models
// poor code declation but this is working for now
const gltfFiles = [
    '../3d/rocket_rider.gltf',
    '../3d/booksPlanet.gltf',
    '../3d/workPlanet.gltf',
    '../3d/artPlanet.gltf'
];

const modelsPos = [
    [5, -2, -8],
    [-8, 0, 42],
    [8, 3, 100],
    [-10, 5, 165]
];

const modelsLightPos = [
    [-3, 3, 2],
    [2, 2, 4],
    [-3, 4, 4],
    [2, 2, 4]
];

const rocketRider = new ModelTemplate();
const bookPlanet = new ModelTemplate();
const workPlanet = new ModelTemplate();
const artPlanet = new ModelTemplate();

const modelsList = [
    rocketRider,
    bookPlanet,
    workPlanet,
    artPlanet
];

const modelsAnnimationSettings = [
    [0.005, 1, 0.5],
    [-0.005, 1, 0.5],
    [0.005, 1, 0.5],
    [-0.01, 0.5, 1]
];

const modelsAnnimationRotationSettings = [
    false,
    true,
    true,
    true
];

// Instantiate a loader
const loader = new GLTFLoader();

for (let i = 0; i<gltfFiles.length; i++) {
    // Load a glTF resource
    loader.load(
    	// resource URL
    	gltfFiles[i],
    	// called when the resource is loaded
    	function ( gltf ) {

            modelsList[i].GetObject(gltf.scene)
            modelsList[i].AddToScene(scene);
            const modPos = modelsPos[i]
            modelsList[i].SetPos(modPos[0], modPos[1], modPos[2])
            const modLightPos = modelsLightPos[i]
            modelsList[i].AddLight(scene, modLightPos[0], modLightPos[1], modLightPos[2])

    		// gltf.animations; // Array<THREE.AnimationClip>
    		// gltf.scene; // THREE.Group
    		// gltf.scenes; // Array<THREE.Group>
    		// gltf.cameras; // Array<THREE.Camera>
    		// gltf.asset; // Object

    	},
    	// called while loading is progressing
    	function ( xhr ) {
    		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    	},
    	// called when loading has errors
    	function ( error: any) {
    		console.log( 'An error happened :\n', error );
    	}
    );
}



console.log("Setup done")

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    for (let i = 0; i<modelsList.length; i++){
        const modSettings = modelsAnnimationSettings[i]
        modelsList[i].Animate(modSettings[0], modSettings[1], modSettings[2], modelsAnnimationRotationSettings[i])
    }

    renderer.render(scene, camera);
}
animate();