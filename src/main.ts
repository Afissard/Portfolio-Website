import "/css/style.css";
import * as THREE from "three";
// import * as helpers from "../src/helpers.ts";
import * as loaderFunc from "../src/loader.ts";
import * as light from "../src/lights.ts";
import * as star from "../src/stars.ts";
// import * as placeHolder from "../src/plqceHolderBlock.ts";
import * as rocketRider from "../src/rocketRider.ts";
import * as bookPlanet from "../src/booksPlanet.ts";
import * as workPlanet from "../src/workPlanet.ts";
import * as art_Planet from "../src/artPlanet.ts";


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
Array(200)
	.fill(0)
	.forEach(() => star.addStar(scene));

// PlaceHolders
// const ph1 = new placeHolder.PlaceHolderBlock(scene, 8, 0, -16);

// load 3D model

const rocketRiderModel = await loaderFunc.loadGLTFObject("/3d/rocket_rider.gltf");
const rocketRiderObj = new rocketRider.RocketRider(scene, rocketRiderModel, 5, -2, -8);

const bookPlanetModel = await loaderFunc.loadGLTFObject("/3d/booksPlanet.gltf")
const bookPlanetObj = new bookPlanet.BookPlanet(scene, bookPlanetModel, -8, 0, 42)

const workPlanetModel = await loaderFunc.loadGLTFObject("/3d/workPlanet.gltf")
const workPlanetObj = new workPlanet.WorkPlanet(scene, workPlanetModel, 8, 3, 100)

const artplanetModel = await loaderFunc.loadGLTFObject('/3d/artPlanet.gltf')
const artPlanetObj = new art_Planet.ArtkPlanet(scene, artplanetModel, -10, 5, 165)



// let rocketRiderObj: rocketRider.RocketRider;
// let bookPlanetObj: bookPlanet.BookPlanet;
// let workPlanetObj: workPlanet.WorkPlanet;
// let artPlanetObj: art_Planet.ArtkPlanet;

// loaderFunc.loadGLTFObject('/3D/rocket_rider.gltf').then((result)=> {
// 	rocketRiderObj = new rocketRider.RocketRider(scene, result, 5, -2, -8);
// }).catch((err)=> {
// 	console.log(err)
// });

// loaderFunc.loadGLTFObject('/3D/booksPlanet.gltf').then((result)=> {
// 	bookPlanetObj = new bookPlanet.BookPlanet(scene, result, -8, 0, 42)
// }).catch((err)=> {
// 	console.log(err)
// });

// loaderFunc.loadGLTFObject('/3D/workPlanet.gltf').then((result)=> {
// 	workPlanetObj = new workPlanet.WorkPlanet(scene, result, 8, 3, 100)
// }).catch((err)=> {
// 	console.log(err)
// });

// loaderFunc.loadGLTFObject('/3D/artPlanet.gltf').then((result)=> {
// 	artPlanetObj = new art_Planet.ArtkPlanet(scene, result, -10, 5, 165)
// }).catch((err)=> {
// 	console.log(err)
// });



// let rocketRiderObj: rocketRider.RocketRider;

// async function loadAndCreateRocketRider() {
//     try {
//         const result = await loaderFunc.loadGLTFObject('/3D/rocket_rider.gltf');
//         rocketRiderObj = new rocketRider.RocketRider(scene, result, 5, -2, -8);
//     } catch (err) {
//         console.log(err);
//     }
// }

// // Call the async function to load and create the RocketRider object
// loadAndCreateRocketRider();


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

	rocketRiderObj.Animate()
	bookPlanetObj.Animate()
	workPlanetObj.Animate()
	artPlanetObj.Animate()
	
	renderer.render(scene, camera);
}

animate();
