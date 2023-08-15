import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar, ActionEvent } from '@babylonjs/core';

export default class PlayerInput {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public inputMap: any;
    private _scene: Scene;

    //simple movement
    public horizontal = 0;
    public vertical = 0;
    //tracks whether or not there is movement in that axis
    public horizontalAxis = 0;
    public verticalAxis = 0;

    //jumping and dashing
    public jumpKeyDown = false;
    public dashing = false;

    constructor(scene: Scene) {

        this._scene = scene;

        //scene action manager to detect inputs
        this._scene.actionManager = new ActionManager(this._scene);

        this.inputMap = {};
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            this.inputMap[(evt.sourceEvent.key as string).toLowerCase()] = evt.sourceEvent.type == "keydown";
            console.log(this);
            console.log(evt.sourceEvent.key)
        }));
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        //add to the scene an observable that calls updateFromKeyboard before rendering
        scene.onBeforeRenderObservable.add(() => {
            this._updateFromKeyboard();
        });
    }

    // Keyboard controls & Mobile controls
    //handles what is done when keys are pressed or if on mobile, when buttons are pressed
    private _updateFromKeyboard(): void {

        //forward - backwards movement
        if ((this.inputMap["w"])) {
            this.verticalAxis = 1;
            this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);

        } else if ((this.inputMap["s"])) {
            this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
            this.verticalAxis = -1;
        } else {
            this.vertical = 0;
            this.verticalAxis = 0;
        }

        //left - right movement
        if ((this.inputMap["a"])) {
            //lerp will create a scalar linearly interpolated amt between start and end scalar
            //taking current horizontal and how long you hold, will go up to -1(all the way left)
            this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
            this.horizontalAxis = -1;

        } else if ((this.inputMap["d"])) {
            this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
            this.horizontalAxis = 1;
        }
        else {
            this.horizontal = 0;
            this.horizontalAxis = 0;
        }

        //dash
        if ((this.inputMap["Shift"])) {
            this.dashing = true;
        } else {
            this.dashing = false;
        }

        //Jump Checks (SPACE)
        if ((this.inputMap[" "]) ) {
            this.jumpKeyDown = true;
        } else {
            this.jumpKeyDown = false;
        }
    }
}