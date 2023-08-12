<script lang="ts">
	import Game from "$lib/game"	
    //import {getContext, setContext} from 'svelte';
    import {onMount} from "svelte";

    let canvas : HTMLCanvasElement;
    
    let game : Game;

    onMount(() => {
        game = new Game(canvas);

        game.setInitialScene();
        game.debugModeHotKeys()
    })
</script>
<canvas bind:this={canvas}/>

<style>
    canvas {
        width: 100vw;
        height: 100vh;
    }
</style>
