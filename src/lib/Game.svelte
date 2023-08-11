<script lang="ts">
    import {getContext, setContext} from 'svelte';
    import Game from "./game"
    
    export let canvas : HTMLCanvasElement;
    setContext('game', new Game(canvas));

</script>