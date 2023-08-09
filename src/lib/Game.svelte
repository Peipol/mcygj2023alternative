<script lang="ts">
    import {getContext, setContext} from 'svelte';
    import App from "./"
    
    export let canvas : HTMLCanvasElement;
    setContext('game', new App(canvas));

</script>