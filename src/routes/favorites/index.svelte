<script lang="ts">
	import { favoritePodcasts } from '$lib/store';
	import FavoritePodcastRow from '$lib/components/favoritePodcastRow.svelte';
	import { starExlamation } from '$lib/icons';
</script>

<main>
	<header>
		<h1>Your favorite podcasts</h1>
	</header>

	{#if $favoritePodcasts.length === 0}
		<div class="container">
			{@html starExlamation}
			<div>
				<p>You don't have any favorite podcasts yet.</p>
				<p class="gray">Find a show you enjoy and hit the star icon!</p>
			</div>
		</div>
	{:else}
		{#each $favoritePodcasts as id (id)}
			<FavoritePodcastRow {id} />
		{/each}
	{/if}
</main>

<style lang="scss">
	header {
		padding: 1rem 2rem 0.5rem;
		display: flex;
		align-items: flex-start;
		align-items: center;
		background-color: #161617;
		border-bottom: 1px solid var(--color-dark-gray);
		z-index: 5;
	}

	h1 {
		margin: 0;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		margin: 2rem;
		border: 2px dashed var(--color-dark-gray);
		border-radius: 10px;

		:global(svg) {
			margin-right: 1rem;
		}
	}

	p {
		margin: 0;
		font-size: 1.125rem;
	}

	.gray {
		font-size: 1rem;
		color: var(--color-gray);
	}
</style>
