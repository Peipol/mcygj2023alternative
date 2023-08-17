<script lang="ts">
	import PlayerInput from "$lib/PlayerInput";
	import Game from "$lib/game"	
	import type { AbstractMesh } from "@babylonjs/core";
    //import {getContext, setContext} from 'svelte';
    import {onMount} from "svelte";

    let canvas : HTMLCanvasElement;
    
    let game : Game;

    onMount(async() => {
        game = new Game(canvas);
        const {scene, enviroment} = game
        //game.enviroment.setBasicScene();
        //game.setInitialScene();
        enviroment.setBasicScene()
        
        const bettleLoader = game.importYaNoEsToritoAhoraEsEscarabajito();

        (await bettleLoader).animationGroups[0].pause();
        
        //game.importBoxy();


        game.setPlayerControllerAsync((await bettleLoader).meshes[0]);
        
        game.renderStart()
        game.debugInspector();
        console.log(game);
    })
</script>
<canvas bind:this={canvas}/>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>
