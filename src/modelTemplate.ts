import { Object3D } from "three";
import * as light from "../src/lights.ts";
import * as help from "../src/helpers.ts"

const DEBUG_MODE = false;

export class ModelTemplate {
    object: THREE.Object3D;
    x:number;
    y:number;
    z:number;

    constructor(
    ) {
        this.object = new Object3D();
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    public GetObject(obj: THREE.Object3D) {
        this.object = obj;
    }

    public AddToScene(scene: THREE.Scene){
        if (this.object != null) {
            scene.add(this.object);
        }
    }

    public SetPos(x: number = 0, y: number = 0, z: number = 0) {
        if (this.object != null) {
            this.object.position.set(x, y, z);
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    public AddLight(scene: THREE.Scene, x: number = 0, y: number = 0, z: number = 0) {
        const l = light.addPointLight(scene, this.x+x, this.y+y, this.z+z);
        if (DEBUG_MODE) {
            help.addPointLightHelper(scene, l);
        }
    }

    public Animate(rotSpeed: number=0.005, posSpeed: number=1, amplitude: number=0.5, fullRotation:boolean=true) {
        const time = performance.now() * 0.001; // Get time in seconds
        
        this.object.position.y = Math.sin(time * posSpeed) * amplitude + this.y;
        if (fullRotation) {
            this.object.rotation.y += rotSpeed;
        } else {
            this.object.rotation.y = Math.sin(time * rotSpeed*100) * amplitude*2 + 15;
        }
    }
}
