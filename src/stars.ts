import { SphereGeometry, MeshStandardMaterial, Color, Mesh, MathUtils } from "three";

export function addStar(scene: THREE.Scene) {
	// const starColor1 = 0xffffff;
	const starColor2 = 0xf8f8f8;
	const geometry = new SphereGeometry(0.75, 24, 24);
	const material = new MeshStandardMaterial({ color: starColor2 });
	material.emissive = new Color(starColor2); // emit light
	const star = new Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => MathUtils.randFloatSpread(500));

	star.position.set(x, y, z);
	scene.add(star);
}

// Array(256).fill(0).forEach(addStar);
