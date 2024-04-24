import { BoxGeometry, MeshStandardMaterial, Mesh, Color } from "three";

export class PlaceHolderBlock {
	geometry = new BoxGeometry(3, 3, 3);
	material = new MeshStandardMaterial({ color: 0xfe1493 });
	block = new Mesh(this.geometry, this.material);

	constructor(
		scene: THREE.Scene,
		x: number = 0,
		y: number = 0,
		z: number = 0
	) {
		this.material.emissive = new Color(0xfe1493); // emit light
		this.block.position.x = x;
		this.block.position.y = y;
		this.block.position.z = z;
		scene.add(this.block);
	}

	public Animate() {
		this.block.rotation.x += 0.01;
		this.block.rotation.y += 0.01;
		this.block.rotation.z += 0.01;
	}
}
