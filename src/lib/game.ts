import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
	AbstractMesh,
	ArcRotateCamera,
	CreateBox,
	CreateGround,
	CreateGroundFromHeightMap,
	Engine,
	HemisphericLight,
	Scene,
	SceneLoader,
	Vector3
} from '@babylonjs/core';
import "@babylonjs/loaders"

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
			-Math.PI / 2,
			Math.PI / 3,
			20,
			Vector3.Zero(),
			this.scene
		);

		this.camera.attachControl(this.canvas, true);

		new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

		this.resizeReady(this.engine);

		this.scene.debugLayer.show({
			overlay: true,
			handleResize: true,
		})
	}

	setInitialScene(): void {
		// create a box
		// const box = CreateBox('box', { size: 2 }, this.scene);

		// create ground
		// const ground = CreateGround('ground', { width: 100, height: 100 }, this.scene);
		const ground = CreateGroundFromHeightMap('ground', 'https://doc.babylonjs.com/img/how_to/HeightMap/heightMap.png', {width:100, height:100, subdivisions: 100, maxHeight: 20})
		// move each mesh as needed
		// box.position.y = 1;
		ground.position.y = 0;

		// add a simple rotation animation
		this.scene.onBeforeRenderObservable.add(() => {
			// box.rotation.y += 0.05;
			const boxy = this.scene.getMeshByName("characterMedium_primitive0")
			if (boxy) {

				boxy.position.y += 0.5
				this.camera.target = boxy?.getAbsolutePosition()
			}
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
			console.log(ev);
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.code === 'KeyI') {
				console.log('debug layer toggle');
				if (this.scene.debugLayer.isVisible() === false) {
					this.scene.debugLayer.show({
						handleResize: true,
						overlay: true,
					});
				} else {
					this.scene.debugLayer.hide();
				}
			}
		});
	}

	async importYaNoEsToritoAhoraEsEscarabajito() {
		const escarabajito = await SceneLoader.ImportMeshAsync(
			'',
			'./assets/',
			'escarabajito.glb')

		console.log("miralo",escarabajito)
	}

	async boxy() {
		const boxy = await SceneLoader.ImportMeshAsync(
			'',
			'./assets/',
			'boxy.glb')

		console.log("miralo",boxy)
	}
}
