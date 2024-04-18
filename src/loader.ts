// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// export function loadGLTFObject(gltfPath: string): Promise<THREE.Group> {
//     return new Promise((resolve, reject) => {
//         const loader = new GLTFLoader();
//         loader.load(
//             gltfPath,
//             function (gltf) {
//                 resolve(gltf.scene);
//             },
//             undefined,
//             function (error) {
//                 console.error('An error happened while loading the GLTF file:', error);
//                 reject(error);
//             }
//         );
//     });
// }

// export function loadGLTFObjects(gltfPaths: string[]): Promise<THREE.Group[]> {
//     const promises: Promise<THREE.Group>[] = [];

//     for (const gltfPath of gltfPaths) {
        
//         const promise = loadGLTFObject(gltfPath)

//         promises.push(promise);
//     }

//     return Promise.all(promises);
// }


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export async function loadGLTFObject(gltfPath: string): Promise<THREE.Group> {
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

export async function loadGLTFObjects(gltfPaths: string[]): Promise<THREE.Group[]> {
    const loadedObjects: THREE.Group[] = [];

    for (const gltfPath of gltfPaths) {
        try {
            const loadedObject = await loadGLTFObject(gltfPath);
            loadedObjects.push(loadedObject);
        } catch (error) {
            console.error('An error occurred while loading the GLTF file:', error);
            throw error; // Re-throw the error to propagate it
        }
    }

    return loadedObjects;
}
