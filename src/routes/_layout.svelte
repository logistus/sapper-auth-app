<script>
	import { stores } from '@sapper/app';
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

<Nav {segment}/>

<main class="container mx-auto border border-gray-400 p-4 bg-white">
	<slot></slot>
</main>

<footer class="container mx-auto px-4 py-2 bg-gray-800 text-white">Footer</footer>