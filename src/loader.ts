import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadGLTFObject(gltfPath: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            gltfPath,
            function (gltf) {
                resolve(gltf.scene);
            },
            undefined,
            function (error) {
                console.error('An error happened while loading the GLTF file:', error);
                reject(error);
            }
        );
    });
}
