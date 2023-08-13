<script lang="ts">
	import Game from "$lib/game"	
    //import {getContext, setContext} from 'svelte';
    import {onMount} from "svelte";

    let canvas : HTMLCanvasElement;
    
    let game : Game;

    onMount(() => {
        game = new Game(canvas);
        game.setInitialScene();
        game.debugModeHotKeys();
        game.importYaNoEsToritoAhoraEsEscarabajito()
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
