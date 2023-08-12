import {
	ArcRotateCamera,
	CreateBox,
	CreateGround,
	Engine,
	HemisphericLight,
	Scene,
	Vector3
} from '@babylonjs/core';
//import { Inspector } from '@babylonjs/inspector';


const handleInspector = (scene:Scene) => {
	void Promise.all([
		import("@babylonjs/core/Debug/debugLayer"),
		import("@babylonjs/inspector"),
	]).then((_values) => {
		console.log(_values);
		scene.debugLayer.show({
			handleResize: true,
			overlay: true,
		});
	});
}

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

		new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

		this.resizeReady(this.engine);
	}

	setInitialScene(): void {
		// create a box
		const box = CreateBox('box', { size: 2 }, this.scene);

		// create ground
		const ground = CreateGround('ground', { width: 6, height: 6 }, this.scene);
		// move each mesh as needed
		box.position.y = 1;
		ground.position.y = -1;

		// add a simple rotation animation
		this.scene.onBeforeRenderObservable.add(() => {
			box.rotation.y += 0.01;
		});

		// start the render loop
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}
	resizeReady(engine: Engine) {
		window.addEventListener('resize', () => {
			engine.resize();
		});
	}

	debugModeHotKeys() {
		window.addEventListener('keydown', (ev) => {
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
				console.log('debug layer toggle');
				if (!this.scene.debugLayer.isVisible()) {
					handleInspector(this.scene);
				} else {
					this.scene.debugLayer.hide();
				}
			}
		});
	}
}
