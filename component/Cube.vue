<template>
    <div id="scene"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import {onMounted} from 'vue';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Cube from "~/ts/Cube";
import Animation from "~/ts/Animation";

enum colors {
    Orange = '#ff7300',
    Red = '#ff0030',
    Blue = '#0059ff',
    Green = '#0f0',
    Yellow = '#fff200',
    White = '#fff',
    Black = '#000',
};

const cubesData = [
    {up: colors.Red, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(1, 1, -1)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(0, 1, -1)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(-1, 1, -1)},
    {up: colors.Red, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(1, 1, 0)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(0, 1, 0)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Black, position: new THREE.Vector3(-1, 1, 0)},
    {up: colors.Red, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(1, 1, 1)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(0, 1, 1)},
    {up: colors.Red, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Green, back: colors.Black, position: new THREE.Vector3(-1, 1, 1)},
    {up: colors.Black, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(1, 0, -1)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(0, 0, -1)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(-1, 0, -1)},
    {up: colors.Black, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(1, 0, 0)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(0, 0, 0)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Black, position: new THREE.Vector3(-1, 0, 0)},
    {up: colors.Black, down: colors.Black, left: colors.Orange, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(1, 0, 1)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(0, 0, 1)},
    {up: colors.Black, down: colors.Black, left: colors.Black, right: colors.Yellow, front: colors.Green, back: colors.Black, position: new THREE.Vector3(-1, 0, 1)},
    {up: colors.Black, down: colors.White, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(1, -1, -1)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(0, -1, -1)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Blue, position: new THREE.Vector3(-1, -1, -1)},
    {up: colors.Black, down: colors.White, left: colors.Orange, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(1, -1, 0)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Black, front: colors.Black, back: colors.Black, position: new THREE.Vector3(0, -1, 0)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Yellow, front: colors.Black, back: colors.Black, position: new THREE.Vector3(-1, -1, 0)},
    {up: colors.Black, down: colors.White, left: colors.Orange, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(1, -1, 1)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Black, front: colors.Green, back: colors.Black, position: new THREE.Vector3(0, -1, 1)},
    {up: colors.Black, down: colors.White, left: colors.Black, right: colors.Yellow, front: colors.Green, back: colors.Black, position: new THREE.Vector3(-1, -1, 1)},
] as { up: string, down: string, left: string, right: string, front: string, back: string, position: THREE.Vector3 }[];

onMounted(() => {
    const [scene, controls, renderer, camera] = initScene();
    addShadows();
    createCube();

    function createCube() {
        cubesData.forEach((cubeData) => {
            const cube = new Cube(cubeData.up, cubeData.down, cubeData.left, cubeData.right, cubeData.front, cubeData.back);
            cube.position.copy(cubeData.position);
            scene.add(cube);
        });
    }

    function initScene(): [scene: THREE.Scene, controls: OrbitControls, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera] {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff)
        const camera = new THREE.PerspectiveCamera(75, document.body.clientWidth / document.body.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        camera.position.y = 5;
        camera.position.x = 5;
        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.physicallyCorrectLights = true;
        renderer.shadowMap.enabled = true;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xffffff, 1);
        renderer.setSize(document.body.clientWidth, document.body.clientHeight);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 5;
        controls.maxDistance = 15;
        document.getElementById('scene')?.appendChild(renderer.domElement);
        return [scene, controls, renderer, camera];
    }

    function addShadows(intensity = 1, position: THREE.Vector3 = new THREE.Vector3(1, 10, -1), debug = false) {
        const lightGroup = new THREE.Group()
        lightGroup.name = 'light';
        const light = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 2);
        lightGroup.add(light);
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, intensity);
        directionalLight.position.copy(position);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        const dimensions = 10;
        directionalLight.shadow.camera.left = -dimensions;
        directionalLight.shadow.camera.right = dimensions;
        directionalLight.shadow.camera.top = dimensions;
        directionalLight.shadow.camera.bottom = -dimensions;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        lightGroup.add(directionalLight);
        lightGroup.add(directionalLight.target);

        const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        const planeMaterial = new THREE.ShadowMaterial()
        planeMaterial.opacity = 0.2;
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -1.5
        plane.rotateX(Math.PI / 2);
        plane.rotateY(Math.PI);
        plane.receiveShadow = true;
        lightGroup.add(plane);

        if (debug) {
            lightGroup.add(new THREE.CameraHelper(directionalLight.shadow.camera));
        }
        scene.add(lightGroup);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    async function shuffle() {
        const keys = ['q', 'w', 'e', 'a', 's', 'd', 'y', 'x', 'c'];
        for (let i = 20; i > 0; i--) {
            await rotateByKey(keys[Math.floor(Math.random() * keys.length)], .1)
        }
    }

    function getChangingCubes(key: string): THREE.Object3D[] {
        switch (key) {
            case 'q':
            case 'r':
                return scene.children.filter((child) => child.name !== 'light' && child.position.y === 1);
            case 'w':
            case 't':
                return scene.children.filter((child) => child.name !== 'light' && child.position.y === 0);
            case 'e':
            case 'z':
                return scene.children.filter((child) => child.name !== 'light' && child.position.y === -1);
            case 'a':
            case 'f':
                return scene.children.filter((child) => child.name !== 'light' && child.position.x === -1);
            case 's':
            case 'g':
                return scene.children.filter((child) => child.name !== 'light' && child.position.x === 0);
            case 'd':
            case 'h':
                return scene.children.filter((child) => child.name !== 'light' && child.position.x === 1);
            case 'y':
            case 'v':
                return scene.children.filter((child) => child.name !== 'light' && child.position.z === 1);
            case 'x':
            case 'b':
                return scene.children.filter((child) => child.name !== 'light' && child.position.z === 0);
            case 'c':
            case 'n':
                return scene.children.filter((child) => child.name !== 'light' && child.position.z === -1);
            case 'ArrowUp':
            case 'ArrowLeft':
            case 'ArrowDown':
            case 'ArrowRight':
                return scene.children.filter((child) => child.name !== 'light');
            default:
                return [];
        }
    }

    let rotating = false;

    async function rotateByKey(key: string, duration = .25) {
        if (!rotating) {
            rotating = true;
            const tempGroup = new THREE.Group();
            const changingCubes = getChangingCubes(key);
            changingCubes.forEach((changingCube) => {
                tempGroup.add(changingCube);
            });
            scene.add(tempGroup);


            switch (key) {
                case 'q':
                case 'w':
                case 'e':
                    await Animation.rotateY(tempGroup, 90 * Math.PI / 180, duration)
                    break;
                case 'r':
                case 't':
                case 'z':
                    await Animation.rotateY(tempGroup, (-90 * Math.PI / 180), duration)
                    break;
                case 'a':
                case 's':
                case 'd':
                case 'ArrowLeft':
                    await Animation.rotateX(tempGroup, 90 * Math.PI / 180, duration)
                    break;
                case 'f':
                case 'g':
                case 'h':
                case 'ArrowRight':
                    await Animation.rotateX(tempGroup, (-90 * Math.PI / 180), duration)
                    break;
                case 'y':
                case 'x':
                case 'c':
                case 'ArrowUp':
                    await Animation.rotateZ(tempGroup, 90 * Math.PI / 180, duration)
                    break;
                case 'v':
                case 'b':
                case 'n':
                case 'ArrowDown':
                    await Animation.rotateZ(tempGroup, (-90 * Math.PI / 180), duration)
                    break;
            }

            changingCubes.forEach((child) => {
                let position = new THREE.Vector3();
                child.getWorldPosition(position);
                let quaternion = new THREE.Quaternion();
                child.getWorldQuaternion(quaternion);
                scene.add(child)
                child.position.set(Math.round(position.x), Math.round(position.y), Math.round(position.z));
                child.quaternion.copy(quaternion);
            });

            scene.remove(tempGroup);
            rotating = false;
        }
    }

    animate();
    setTimeout(() => {
        shuffle();
    }, 500)

    window.addEventListener('keydown', async (e: KeyboardEvent) => {
        await rotateByKey(e.key);
    });
});
</script>
