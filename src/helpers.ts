import {GridHelper, PointLightHelper} from "three";

export function addGridHelper(scene: THREE.Scene) {
	const gridHelper = new GridHelper(200, 50);
	scene.add(gridHelper);
}

export function addPointLightHelper(
	scene: THREE.Scene,
	pointLight: THREE.PointLight
) {
	const lightHelper = new PointLightHelper(pointLight);
	scene.add(lightHelper);
}
