
import { ModelTemplate } from "./modelTemplate";

export class RocketRider extends ModelTemplate {
    
    public AddLight(scene: THREE.Scene, x: number, y: number, z: number): void {
        super.AddLight(scene, x-3, y+3, z+2)
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
