import {
	Scene,
	ActionManager,
	ExecuteCodeAction,
	Scalar,
} from "@babylonjs/core";

export default class PlayerInput{
	private scene: Scene;
	private debug = false
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public inputMap: any;
	public horizontal = 0;
	public vertical = 0;
	public horizontalAxis = 0;
	public verticalAxis = 0;

	public jumpKeyDown = false;
	public dashing = false;

	constructor(scene: Scene) {
		this.scene = scene;
		this.scene.actionManager = new ActionManager(this.scene);

		this.inputMap = {};

		this.scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
				this.inputMap[(evt.sourceEvent.key as string).toLowerCase()] =
					evt.sourceEvent.type == "keydown";
					console.log(this)
			})
		);
		this.scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
				this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			})
		);

		this.scene.onBeforeRenderObservable.add(() => {
			console.log(this)
			this._updateFromKeyboard();
		});
	}

	private _updateFromKeyboard(): void {
		//forward - backwards movement
		if (this.inputMap["w"]) {
			this.verticalAxis = 1;
			this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
		} else if (this.inputMap["s"]) {
			this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
			this.verticalAxis = -1;
		} else {
			this.vertical = 0;
			this.verticalAxis = 0;
		}

		/**
         * LEFT - RIGHT MOVEMENT
         */
		if (this.inputMap["a"]) {
			this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
			this.horizontalAxis = -1;
		} else if (this.inputMap["d"]) {
			this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
			this.horizontalAxis = 1;
		} else {
			this.horizontal = 0;
			this.horizontalAxis = 0;
		}

		/**
         * RUNNING
         */
		if (this.inputMap["Shift"]) {
			this.dashing = true;
		} else {
			this.dashing = false;
		}

		/**
         * JUMPING
         */
		if (this.inputMap[" "]) {
			this.jumpKeyDown = true;
		} else {
			this.jumpKeyDown = false;
		}
	}

	Debug(): void {
		this.debug = true
	}
}
