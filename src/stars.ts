import * as THREE from "three";

export function addStar(scene: THREE.Scene) {
	// const starColor1 = 0xffffff;
	const starColor2 = 0xf8f8f8;
	const geometry = new THREE.SphereGeometry(0.75, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: starColor2 });
	material.emissive = new THREE.Color(starColor2); // emit light
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(800));

	star.position.set(x, y, z);
	scene.add(star);
}

// Array(256).fill(0).forEach(addStar);
