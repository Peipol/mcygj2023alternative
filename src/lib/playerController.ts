import { AbstractMesh, Mesh, Scene, TransformNode, ArcRotateCamera } from "@babylonjs/core";
import type PlayerInput from "./PlayerInput";

export default class PlayerController extends TransformNode {
	private scene: Scene;
	private playerInput: PlayerInput;
	public mesh: Mesh | AbstractMesh;
	public speed = 0.1;
	public camera: ArcRotateCamera;

	constructor(
		scene: Scene,
		mesh: Mesh | AbstractMesh,
		camera: ArcRotateCamera,
		playerInput: PlayerInput
	) {
		super("playerController", scene);
		this.scene = scene;
		this.playerInput = playerInput;
		this.mesh = mesh;
		this.mesh.parent = this;
		this.camera = camera;

		this.moveAnimationHandler();
		this.updateCameraTarget();
	}

	moveAnimationHandler() {
		this.scene.onBeforeRenderObservable.add(() => {
			this.position.z += this.playerInput.vertical * this.speed;
			this.position.x += this.playerInput.horizontal * this.speed;

            if (this.playerInput.vertical > 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.rotation.y = 0;
			} else if (this.playerInput.vertical < 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.rotation.y = Math.PI;
			} else if (this.playerInput.horizontal > 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.rotation.y = Math.PI / 2;
			} else if (this.playerInput.horizontal < 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.rotation.y = -Math.PI / 2;
			} else {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.stop();
			}
		});
	}

	updateCameraTarget() {
		this.scene.onBeforeRenderObservable.add(() => {
			this.camera.target = this.mesh.getAbsolutePosition();
		});
	}
}
