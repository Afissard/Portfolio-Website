// import * as THREE from "three";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as light from "../src/lights.ts";
import * as star from "../src/stars.ts";

// import { ModelTemplate } from "./modelTemplate";
import { RocketRider } from "./rocketRider.ts";


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
// Instantiate a loader
const loader = new GLTFLoader();

let rocketRider = new RocketRider();

// Load a glTF resource
loader.load(
	// resource URL
	'../3d/rocket_rider.gltf',
	// called when the resource is loaded
	function ( gltf ) {

        rocketRider.GetObject(gltf.scene)
        rocketRider.AddToScene(scene);
        rocketRider.SetPos(5, -2, -8)
        rocketRider.AddLight(scene, 5, -2, -8)
        
		// scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

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

console.log("Setup done")

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    rocketRider.Animate();

    renderer.render(scene, camera);
}
animate();