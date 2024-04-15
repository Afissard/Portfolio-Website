import * as THREE from "three";

export class modelTemplate {
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
        // this.object.rotation.y = 90
        scene.add(this.object);
        
    }

    public Animate() {
        // const time = performance.now() * 0.001; // Get time in seconds
        // const speed = 1;
        // const amplitude = 0.5;
        // // Calculate the vertical position using a sine wave
        // this.object.position.y = Math.sin(time * speed) * amplitude;
        // this.object.rotation.y = Math.sin(time * speed/2) * amplitude*2 + 15;
    }
    
}
