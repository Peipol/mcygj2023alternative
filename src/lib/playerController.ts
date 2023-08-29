import { AbstractMesh, Mesh, Scene, TransformNode, ArcRotateCamera, Vector3, Quaternion } from "@babylonjs/core";
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
			this.rotation.y = this.camera.absoluteRotation.toEulerAngles()._y;
			//this.position.addInPlace(this.mesh.forward.scale(this.playerInput.vertical * this.speed));
			this.position.x += this.forward.x * this.playerInput.vertical * this.speed;
			this.position.z += this.forward.z * this.playerInput.vertical * this.speed;
			this.position.x += 1 * this.right.x * this.playerInput.horizontal * this.speed;
			this.position.z += 1 * this.right.z * this.playerInput.horizontal * this.speed;

			//this.mesh.rotation = new Vector3(0 *Math.PI, 1/2 *Math.PI,0 *Math.PI);
            if (this.playerInput.vertical > 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.mesh.rotation = new Vector3(0 * Math.PI, 1 * Math.PI,0 * Math.PI);
			} else if (this.playerInput.vertical < 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.mesh.rotation = new Vector3(0 * Math.PI, 2 * Math.PI,0 * Math.PI);
			} else if (this.playerInput.horizontal > 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.mesh.rotation = new Vector3(0 * Math.PI, -1/2 * Math.PI,0 * Math.PI);
			} else if (this.playerInput.horizontal < 0) {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play();
				this.mesh.rotation = new Vector3(0 * Math.PI, 1/2 * Math.PI,0 * Math.PI);
			} else {
				this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.reset();
				//this.mesh.rotation = new Vector3(0 * Math.PI, 1 * Math.PI,0 * Math.PI);
			}
		});
	}

	updateCameraTarget() {
		this.scene.onBeforeRenderObservable.add(() => {
			this.camera.target = this.mesh.getAbsolutePosition();
		});
	}
}
