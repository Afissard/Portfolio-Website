import * as THREE from "three";

export function addAmbientLight(scene: THREE.Scene) {
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
}

export function addPointLight(scene: THREE.Scene, x: number, y: number, z: number) {
	const pointLight = new THREE.PointLight(0xffffff, 25);
	pointLight.position.set(x, y, z);
	scene.add(pointLight);

	return pointLight;
}
