import { AbstractMesh,CreateGround,CreateGroundFromHeightMap,CreateSphere,Mesh, Scene, TransformNode, Vector3 } from "@babylonjs/core";

export default class Enviroment extends TransformNode {
    scene!: Scene;
    meshes!: (AbstractMesh | Mesh)[];

    constructor(scene: Scene) {
        super("enviroment", scene);
        this.scene = scene;
        this.meshes = [];
    }

    addMesh(mesh: AbstractMesh | Mesh) {
        this.meshes.push(mesh);
    }

    addMeshes(meshes: (AbstractMesh | Mesh)[]) {
        meshes.forEach(mesh => {
            this.addMesh(mesh);
        });
        this.setCenterAsParent();
    }

    setCenterPosition(center: Vector3) {
        this.position = center;
    }

    setCenterAsParent() {
        this.meshes.forEach(mesh => {
            mesh.parent = this;
        });
    }

    setBasicScene() {
        //create a Sphere
        const sphere = CreateSphere("sphere1", { diameter: 0.5, segments: 1}, this.scene);
        // create ground
        const ground = CreateGround("ground1",{ height: 100, width:100, subdivisions: 1}, this.scene);

        // position the sphere
        sphere.position.y = 0;

        this.addMeshes([sphere, ground]);
        this.setCenterAsParent();
    }

    setOldInitialScene(): void {
		const ground = CreateGroundFromHeightMap(
			"ground",
			"https://doc.babylonjs.com/img/how_to/HeightMap/heightMap.png",
			{ width: 100, height: 100, subdivisions: 100, maxHeight: 20 }
		);
		
		ground.position.y = 0;

		//const boxy = this.scene.getMeshByName("characterMedium_primitive0");
		// const CoT = new TransformNode("CoT");
		// CoT.scaling = new Vector3(1, 1, 1).scale(0.01);
		// CoT.rotation = new Vector3(Math.PI/2, Math.PI * 1/2, Math.PI * 0);
		// if (boxy) boxy.parent = CoT;

	}

}