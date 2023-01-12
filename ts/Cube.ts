import * as THREE from 'three';

export default class Cube extends THREE.Group {
    private _topColor: string;
    private _bottomColor: string;
    private _leftColor: string;
    private _rightColor: string;
    private _faceColor: string;
    private _backColor: string;


    constructor(topColor = '#000000', bottomColor = '#000000', leftColor = '#000000', rightColor = '#000000', faceColor = '#000000', backColor = '#000000') {
        super();
        this._topColor = topColor;
        this._bottomColor = bottomColor;
        this._leftColor = leftColor;
        this._rightColor = rightColor;
        this._faceColor = faceColor;
        this._backColor = backColor;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x000000});
        const cube = new THREE.Mesh(geometry, cubeMaterial);
        this.add(cube);

        cube.castShadow = true; //default is false
        cube.receiveShadow = false; //default

        const plateGeometry = new THREE.PlaneGeometry(.9, .9);

        const faceMaterial = new THREE.MeshStandardMaterial({color: this._faceColor, side: THREE.DoubleSide});
        const face = new THREE.Mesh(plateGeometry, faceMaterial);
        face.position.z = .51;
        this.add(face);

        const backMaterial = new THREE.MeshStandardMaterial({color: this._backColor, side: THREE.DoubleSide});
        const back = new THREE.Mesh(plateGeometry, backMaterial);
        back.position.z = -.51;
        this.add(back);

        const leftMaterial = new THREE.MeshStandardMaterial( {color: this._leftColor, side: THREE.DoubleSide});
        const left = new THREE.Mesh(plateGeometry, leftMaterial);
        left.position.x = .51;
        left.rotation.y = 90 * Math.PI / 180;
        this.add(left);

        const rightMaterial = new THREE.MeshStandardMaterial( {color: this._rightColor, side: THREE.DoubleSide});
        const right = new THREE.Mesh(plateGeometry, rightMaterial);
        right.position.x = -.51;
        right.rotation.y = 90 * Math.PI / 180;
        this.add(right);

        const bottomMaterial = new THREE.MeshStandardMaterial( {color: this._bottomColor, side: THREE.DoubleSide});
        const bottom = new THREE.Mesh(plateGeometry, bottomMaterial);
        bottom.position.y = -.51;
        bottom.rotation.x = 90 * Math.PI / 180;
        this.add(bottom);

        const topMaterial = new THREE.MeshStandardMaterial( {color: this._topColor, side: THREE.DoubleSide});
        const top = new THREE.Mesh(plateGeometry, topMaterial);
        top.position.y = .51;
        top.rotation.x = 90 * Math.PI / 180;
        this.add(top);
    }


    get topColor(): string {
        return this._topColor;
    }

    set topColor(value: string) {
        this._topColor = value;
    }

    get bottomColor(): string {
        return this._bottomColor;
    }

    set bottomColor(value: string) {
        this._bottomColor = value;
    }

    get leftColor(): string {
        return this._leftColor;
    }

    set leftColor(value: string) {
        this._leftColor = value;
    }

    get rightColor(): string {
        return this._rightColor;
    }

    set rightColor(value: string) {
        this._rightColor = value;
    }

    get faceColor(): string {
        return this._faceColor;
    }

    set faceColor(value: string) {
        this._faceColor = value;
    }

    get backColor(): string {
        return this._backColor;
    }

    set backColor(value: string) {
        this._backColor = value;
    }
}
