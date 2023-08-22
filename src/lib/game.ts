import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
	AbstractMesh,
	ArcRotateCamera,
	CreateGroundFromHeightMap,
	Engine,
	HemisphericLight,
	Mesh,
	Scene,
	SceneLoader,
	TransformNode,
	Vector3,
	type ISceneLoaderAsyncResult,
	type Nullable
} from "@babylonjs/core";
import "@babylonjs/loaders";
import Enviroment from "./enviroment";
import PlayerInput from "./PlayerInput";
import PlayerController from "./playerController";

export default class Game {
	public canvas: HTMLCanvasElement | undefined;
	public engine: Engine;
	public scene: Scene;
	public camera: ArcRotateCamera;
	/**
	 * Custom properties
	*/
	public enviroment: Enviroment;
	public playerInput: PlayerInput;
	public playerController: PlayerController | undefined;

	constructor(gameCanvas: HTMLCanvasElement) {
		this.canvas = gameCanvas;
		this.engine = new Engine(this.canvas, false);
		this.scene = new Scene(this.engine);
		this.enviroment = new Enviroment(this.scene);
		this.playerInput = new PlayerInput(this.scene);
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
	}

	public renderStart(): void {
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

	public resizeReady(engine: Engine): void {
		window.addEventListener("resize", () => {
			engine.resize();
		});
	}

	public debugInspector(): void {
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

	public async importYaNoEsToritoAhoraEsEscarabajito(): Promise<ISceneLoaderAsyncResult> {
		const escarabajitoLoader = await SceneLoader.ImportMeshAsync(
			"",
			"./assets/",
			"escarabajito.glb"
		);
		console.log("escarabajitoLoader", escarabajitoLoader);
		return escarabajitoLoader;
	}

	public async importBoxy(): Promise<void> {
		const boxyLoader = await SceneLoader.ImportMeshAsync("", "./assets/", "boxy.glb");
		console.log("boxyLoader", boxyLoader);
	}

	public async ImportMeshAsync(
		name: string | "",
		rootUrl: string,
		fileName: string
	): Promise<AbstractMesh[]> {
		const meshLoader = await SceneLoader.ImportMeshAsync(name, rootUrl, fileName);
		console.log("meshLoader", meshLoader);

		return meshLoader.meshes;
	}

	public async setPlayerControllerAsync(playerMesh: AbstractMesh | Mesh) {
		return new PlayerController(this.scene, playerMesh, this.camera, this.playerInput);
	}
}
