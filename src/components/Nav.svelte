<script>
	import { stores } from '@sapper/app';

	export let segment;
	let username = "";
	let isOpen = false;
	const { session } = stores();
	
	function menuToggle() {
		isOpen = !isOpen;
	}

	async function logout() {
		fetch('/auth/logout', {method: "POST"});
		$session.username = null;
	}
</script>

<header class="container mx-auto bg-gray-900 sm:px-4 sm:py-3">
	<div class="mx-auto sm:flex">
		<div class="flex items-center justify-between px-4 py-3 sm:p-0">
			<div>
				<a href="." class="text-white font-bold mr-4">Logi</a>
			</div>
			<div class="sm:hidden">
				<button on:click={menuToggle} type="button" class="block text-gray-500 hover:text-white focus:text-white focus:outline-none">
				<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
					{#if isOpen}
					<path fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
					{:else}
					<path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
					{/if}
				</svg>
				</button>
			</div>
		</div>
		<nav class="{isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-4 sm:flex sm: justify-between items-center sm:p-0 w-full">
			<div class="sm:flex sm:mb-0 mb-4">
				<a href="." class:current='{segment === undefined}'
						class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">home</a>
			</div>
			{#if !$session.username}
			<div>
				<a href="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mt-0 mt-2 ml-2">Login</a>
				<a href="register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded sm:mt-0 mt-2 ml-2">Register</a>
			</div>
			{:else}
			<div>
				<span class="text-white font-bold">{$session.username}</span>
				<button type="button" on:click={logout} class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded sm:mt-0 mt-2 ml-2">Logout</button>
			</div>
			{/if}
		</nav>
	</div>
</header>
