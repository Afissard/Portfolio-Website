import * as THREE from "three";

export function addStar(scene: THREE.Scene) {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	material.emissive = new THREE.Color(0xffffff); // emit light
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(500));

	star.position.set(x, y, z);
	scene.add(star);
}

// Array(256).fill(0).forEach(addStar);
