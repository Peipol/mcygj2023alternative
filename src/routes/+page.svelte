<script lang="ts">
	import type PlayerInput from "$lib/PlayerInput";
	import Game from "$lib/game"	
	import type { AbstractMesh } from "@babylonjs/core";
    //import {getContext, setContext} from 'svelte';
    import {onMount} from "svelte";
	import { writable } from "svelte/store";

    let canvas : HTMLCanvasElement;
    
    let game : Game;
    
    let inputMap = writable<string>("{}")
    
    inputMap.subscribe((v)=>console.log("inputs",v))

    onMount(async() => {
        game = new Game(canvas);
        const {scene, enviroment} = game
        //game.enviroment.setBasicScene();
        //game.setInitialScene();
        enviroment.setBasicScene()
        
        const bettleLoader = game.importYaNoEsToritoAhoraEsEscarabajito();

        (await bettleLoader).animationGroups[0].pause();
        
        game.importBoxy();


        game.setPlayerControllerAsync((await bettleLoader).meshes[0]);
        // create a window key event
            window.addEventListener("keydown", (e) => {
                inputMap.set(JSON.stringify(game.playerInput.inputMap));
            });
            window.addEventListener("keyup", (e) => {
                inputMap.set(JSON.stringify(game.playerInput.inputMap));
            });

        inputMap.set(game.playerInput.inputMap);
        
        game.renderStart()
        game.debugInspector();
        console.log(game);
    })
</script>
<h1>{$inputMap}</h1>
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
    h1 {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>
