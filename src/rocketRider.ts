// import * as THREE from "three";
import { modelTemplate } from "./modelTemplate";
import * as light from "../src/lights.ts";
// import * as helpers from "../src/helpers.ts";

export class RocketRider extends modelTemplate {
    constructor(
        scene: THREE.Scene,
        object: THREE.Object3D,
        x: number = 0,
        y: number = 0,
        z: number = 0
    ) {
        super(scene, object, x, y, z)
        // const plight = light.addPointLight(scene, x-2, y+3, z+2)
        light.addPointLight(scene, x-2, y+3, z+2)
        // helpers.addPointLightHelper(scene, plight)
    }

    public Animate() {
        const time = performance.now() * 0.001; // Get time in seconds
        const speed = 1;
        const amplitude = 0.5;
        // Calculate the vertical position using a sine wave
        this.object.position.y = Math.sin(time * speed) * amplitude + this.trueY;
        this.object.rotation.y = Math.sin(time * speed/2) * amplitude*2 + 15;
    }
    
}
