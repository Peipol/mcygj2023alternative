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
	TransformNode,
	Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders";
import PlayerInput from "./PlayerInput";

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
			"Camera",
			-Math.PI / 2,
			Math.PI / 3,
			20,
			Vector3.Zero(),
			this.scene
		);

		this.camera.attachControl(this.canvas, true);

		new HemisphericLight("light", new Vector3(1, 1, 0), this.scene);

		this.resizeReady(this.engine);

		this.scene.debugLayer.show({
			overlay: true,
			handleResize: true
		});
	}

	setInitialScene(): void {
		// create a box
		// const box = CreateBox('box', { size: 2 }, this.scene);

		// create ground
		// const ground = CreateGround('ground', { width: 100, height: 100 }, this.scene);
		const ground = CreateGroundFromHeightMap(
			"ground",
			"https://doc.babylonjs.com/img/how_to/HeightMap/heightMap.png",
			{ width: 100, height: 100, subdivisions: 100, maxHeight: 0 }
		);
		// move each mesh as needed
		ground.position.y = 0;


		// boxyloxy
		const boxy = this.scene.getMeshByName("characterMedium_primitive0");
		const CoT = new TransformNode("CoT");
		CoT.scaling = new Vector3(1, 1, 1).scale(0.01);
		CoT.rotation = new Vector3(Math.PI/2, Math.PI * 1/2, Math.PI * 0);
		if (boxy) boxy.parent = CoT;

		const player = new PlayerInput(this.scene);
		// add a simple rotation animation
		this.scene.onBeforeRenderObservable.add(() => {
			const boxy = this.scene.getMeshByName("characterMedium_primitive0")
			if (boxy) {
				if (boxy.parent) boxy.parent = CoT;
				//CoT.position.addInPlace(boxy.up.scale(0.1));
				boxy.rotation.z += 0.005;
				this.camera.target = this.scene.getTransformNodeByName("CoT")?.getAbsolutePosition() || Vector3.Zero();
			}
		});

		// start the render loop
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

	resizeReady(engine: Engine) {
		window.addEventListener("resize", () => {
			engine.resize();
		});
	}

	debugModeHotKeys() {
		window.addEventListener("keydown", (ev) => {
			// Shift+Ctrl+Alt+I
			if (ev.shiftKey && ev.code === "KeyI") {
				console.log("debug layer toggle");
				if (this.scene.debugLayer.isVisible() === false) {
					this.scene.debugLayer.show({
						handleResize: true,
						overlay: true
					});
				} else {
					this.scene.debugLayer.hide();
				}
			}
		});
	}

	async importYaNoEsToritoAhoraEsEscarabajito() {
		const escarabajito = await SceneLoader.ImportMeshAsync("", "./assets/", "escarabajito.glb");

	}

	/*controlWalk() {
		window.addEventListener("keydown", (ev) => {
			const CoT = this.scene.getTransformNodeByName("CoT");
			const boxy = this.scene.getMeshByName("characterMedium_primitive0")
			if (boxy && CoT) {
				if (ev.code === "KeyW") {
					CoT.position.addInPlace(boxy.up.scale(0.1));
				}
				if (ev.code === "KeyS") {
					CoT.position.addInPlace(boxy.up.scale(-0.1));
				}
				if (ev.code === "KeyA") {
					CoT.position.addInPlace(CoT.right.scale(-0.1));
				}
				if (ev.code === "KeyD") {
					CoT.position.addInPlace(CoT.right.scale(0.1));
				}
			}
		});
	}*/

	async boxy() {
		const boxy = await SceneLoader.ImportMeshAsync("", "./assets/", "boxy.glb");
		boxy.position = new Vector3(5, 5, 0);
	}
}
