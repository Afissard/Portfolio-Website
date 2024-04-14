import * as THREE from "three";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class RocketRider {
    object: THREE.Object3D

    constructor(
        scene: THREE.Scene,
        object: THREE.Object3D,
        x: number = 0,
        y: number = 0,
        z: number = 0
    ) {
        this.object = object
        this.object.position.set(x, y, z);
        this.object.rotation.y = 90
        scene.add(this.object);
        
    }

    public Animate() {
        // this.object.rotation.x += 0.01;
        this.object.rotation.y += 0.01;
        // this.object.rotation.z += 0.01;
    }
}
