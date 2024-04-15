import { modelTemplate } from "./modelTemplate";

export class BookPlanet extends modelTemplate {

    public Animate() {
        const time = performance.now() * 0.001; // Get time in seconds
        const speed = 1;
        const amplitude = 0.5;
        // Calculate the vertical position using a sine wave
        this.object.position.y = Math.sin(time * speed/2) * amplitude;
        this.object.rotation.y += 0.005;
    }
    
}
