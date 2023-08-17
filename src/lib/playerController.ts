import { AbstractMesh, Mesh, Scene, TransformNode, ArcRotateCamera } from "@babylonjs/core"
import type PlayerInput from "./PlayerInput";

export default class PlayerController extends TransformNode {
    private scene : Scene;
    private playerInput : PlayerInput;
    public mesh : Mesh | AbstractMesh;
    public speed = 0.1;
    public camera : ArcRotateCamera;

    constructor(scene: Scene, mesh: Mesh | AbstractMesh, camera: ArcRotateCamera, playerInput: PlayerInput) {
        super("playerController", scene)
        this.scene = scene;
        this.playerInput = playerInput;
        this.mesh = mesh;
        this.mesh.parent = this;
        this.camera = camera;
        
        this.moveForwardBackward()
        this.moveLeftRight()
        this.updateCameraTarget()
    }

    moveForwardBackward() {
        this.scene.onBeforeRenderObservable.add(() => {
            this.mesh.position.z += this.playerInput.vertical * this.speed;

            if(this.playerInput.vertical > 0) {
                this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.play(true)
            }
             else {
                this.scene.getAnimationGroupByName("Armature|mixamo.com|Layer0")?.stop()
            }
        })
    }

    moveLeftRight() {
        this.scene.onBeforeRenderObservable.add(() => {
            this.mesh.position.x += this.playerInput.horizontal * this.speed;
        })
    }

    updateCameraTarget(){
        this.scene.onBeforeRenderObservable.add(() => {
            this.camera.target = this.mesh.getAbsolutePosition()
        })
    }
}