import { ArcRotateCamera, Engine, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';

export default class App {
	public canvas: HTMLCanvasElement | undefined;
	public engine: Engine;
	public scene: Scene;
	public camera: ArcRotateCamera;

	constructor(gameCanvas: HTMLCanvasElement) {
		this.canvas = gameCanvas;
		this.engine = new Engine(this.canvas, false);
		this.scene = new Scene(this.engine);
		this.camera = new ArcRotateCamera(
			'Camera',
			Math.PI / 2,
			Math.PI / 6,
			10,
			Vector3.Zero(),
			this.scene
		);

		this.camera.attachControl(this.canvas, true);

		this.setCameraZoomConfig(this.camera, {
			wheelPrecision: 70,
			lowerRadiusLimit: 3,
			upperRadiusLimit: 30
		});

		const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);
	}
	setCameraZoomConfig(
		camera: ArcRotateCamera,
		arg1: { wheelPrecision: number; lowerRadiusLimit: number; upperRadiusLimit: number }
	) {
		throw new Error('Method not implemented.');
	}
}

