import {gsap} from 'gsap';
import * as THREE from 'three';

export default class Animation {

    static rotateX = (object: THREE.Object3D, rotation: number, duration: number = .5) => new Promise<void>((resolve) => {
        gsap.to(object.rotation, {
            x: rotation,
            ease: 'Power4.easeInOut',
            duration,
            onComplete: () => {
                resolve();
            },
        }).play();
    });

    static rotateY = (object: THREE.Object3D, rotation: number, duration: number = .5) => new Promise<void>((resolve) => {
        gsap.to(object.rotation, {
            y: rotation,
            ease: 'Power4.easeInOut',
            duration,
            onComplete: () => {
                resolve();
            },
        }).play();
    });

    static rotateZ = (object: THREE.Object3D, rotation: number, duration: number = .5) => new Promise<void>((resolve) => {
        gsap.to(object.rotation, {
            z: rotation,
            ease: 'Power4.easeInOut',
            duration,
            onComplete: () => {
                resolve();
            },
        }).play();
    });

    static animateVector3 = (vectorToAnimate: THREE.Vector3, target: THREE.Vector3, duration: number = 3, onUpdate?: (progress: number, data: any) => void) => new Promise<void>((resolve) => {
        const animation = gsap.to(vectorToAnimate, {
            ease: 'Power4.easeInOut',
            duration,
            x: target.x,
            y: target.y,
            z: target.z,

            onUpdate(v) {
                if (onUpdate) {
                    onUpdate(animation.progress(), {x: v.x, y: v.y, z: v.z});
                }
            },

            onUpdateParams: [vectorToAnimate],
            onComplete: () => {
                resolve();
            },
        }).play();
    });

    static animateVectorZ = (vectorToAnimate: THREE.Vector3, target: THREE.Vector3) => {
        gsap.to(vectorToAnimate, {
            duration: 1,
            z: target.z,
        });
    };
}
