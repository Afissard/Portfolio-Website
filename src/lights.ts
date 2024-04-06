import * as THREE from "three";

export function addAmbientLight(scene: THREE.Scene) {
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
}

export function addPointLight(scene: THREE.Scene) {
	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(5, 5, 5);
	scene.add(pointLight);

	return pointLight;
}
