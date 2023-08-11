import { ArcRotateCamera, CreateSphere, Engine, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';

export default class Game {
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

		const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

		// this.resizeReady(this.engine);
	}

	setInitialScene(): void {
		// create a sphere
		const sphere = CreateSphere('sphere', { diameter: 2 }, this.scene);

		// create ground
		const ground = CreateSphere('ground', { diameter: 10, segments: 10 }, this.scene);

		// move each mesh as needed
		sphere.position.y = 1;
		ground.position.y = -1;

		// start the render loop
		this.engine.runRenderLoop(() => {
			this.scene.render();
		}
		);
	}
	resizeReady(engine: Engine) {
		window.addEventListener("resize", () => {
		  engine.resize();
		});
	  }
	
}
