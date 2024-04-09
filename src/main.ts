import "/css/style.css";
import * as THREE from "three";
// import * as helpers from "../src/helpers.ts";
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
// helpers.addGridHelper(scene);

// Lights
light.addAmbientLight(scene);

// stars
Array(512)
	.fill(0)
	.forEach(() => star.addStar(scene));

// PlaceHolders
const ph1 = new placeHolder.PlaceHolderBlock(scene, 8, 0, -16);
const ph2 = new placeHolder.PlaceHolderBlock(scene, -8, 5, 32);
const ph3 = new placeHolder.PlaceHolderBlock(scene, 8, 10, 64);
const ph4 = new placeHolder.PlaceHolderBlock(scene, -15, 10, 96);
const ph5 = new placeHolder.PlaceHolderBlock(scene, 15, 15, 128);
const ph6 = new placeHolder.PlaceHolderBlock(scene, -15, 20, 160);

// function scrollTo(hash) {
//     location.hash = "#" + hash;
// }

// camera
function moveCamera() {
	/*
    TODO: smooth translation to the next section -> no need for long scroll
    */
	const t = document.body.getBoundingClientRect().top;

	const moveSpeed = -0.01;
	camera.position.z = t * moveSpeed * 2;
	camera.position.x = t * moveSpeed * 0.01;
	camera.rotation.y = t * moveSpeed * 0.001;
	camera.position.y = t * moveSpeed * 0.1;
}

document.body.onscroll = moveCamera;
moveCamera();

// animation
function animate() {
	requestAnimationFrame(animate);

	ph1.Animate();
	ph2.Animate();
	ph3.Animate();
	ph4.Animate();
	ph5.Animate();
	ph6.Animate();
	
	renderer.render(scene, camera);
}

animate();
