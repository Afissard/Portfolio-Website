import "/css/style.css";
import * as THREE from "three";
import * as helpers from "../src/helpers.ts";
import * as light from "../src/lights.ts";
import * as star from "../src/stars.ts";
import * as placeHolder from "../src/plqceHolderBlock.ts";

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

renderer.render(scene, camera);

// Helpers
helpers.addGridHelper(scene);

// Lights
light.addAmbientLight(scene);

// stars
Array(256)
	.fill(0)
	.forEach(() => star.addStar(scene));

// PlaceHolders
const ph1 = new placeHolder.PlaceHolderBlock(scene);

// camera
function moveCamera() {
	/*
    TODO: smooth translation to the next section -> no need for long scroll
    */
	const t = document.body.getBoundingClientRect().top;

	const moveSpeed = -0.01;
	camera.position.z = t * moveSpeed;
	camera.position.x = t * moveSpeed * 0.01;
	camera.rotation.y = t * moveSpeed * 0.0001;
	camera.position.y = t * moveSpeed * 0.1;
}

document.body.onscroll = moveCamera;
moveCamera();

// animation
function animate() {
	requestAnimationFrame(animate);

	ph1.Animate();

	renderer.render(scene, camera);
}

animate();
