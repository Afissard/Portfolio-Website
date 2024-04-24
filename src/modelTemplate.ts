import { Object3D } from "three";
import * as light from "../src/lights.ts";
import * as help from "../src/helpers.ts"

const DEBUG_MODE = true;

export class ModelTemplate {
    object: THREE.Object3D
    trueY:number

    constructor(
    ) {
        this.object = new Object3D()
        this.trueY = 0
        
    }

    public GetObject(obj: THREE.Object3D) {
        this.object = obj;
    }

    public AddToScene(scene: THREE.Scene){
        if (this.object != null) {
            scene.add(this.object)
        }
    }

    public SetPos(x: number = 0, y: number = 0, z: number = 0) {
        if (this.object != null) {
            this.object.position.set(x, y, z);
            this.trueY = y
        }
    }

    public AddLight(scene: THREE.Scene, x: number = 0, y: number = 0, z: number = 0) {
        if (DEBUG_MODE) {
            const l = light.addPointLight(scene, x, y, z);
            help.addPointLightHelper(scene, l);
        } else {
            light.addPointLight(scene, x, y, z);
        }
    }

    public Animate() {
        const time = performance.now() * 0.001; // Get time in seconds
        const speed = 1;
        const amplitude = 0.5;
        // Calculate the vertical position using a sine wave
        this.object.position.y = Math.sin(time * speed) * amplitude;
        this.object.rotation.y = Math.sin(time * speed/2) * amplitude*2 + 15;
    }
}
