<script>
	import { favoritePodcasts } from '$lib/store';
	import { starOutline, starSolid } from '$lib/icons';

	export let id;

	$: isFavorite = $favoritePodcasts.includes(id);
</script>

<button
	on:click={isFavorite
		? () => ($favoritePodcasts = $favoritePodcasts.filter((ID) => ID !== id))
		: () => ($favoritePodcasts = [...$favoritePodcasts, id])}
>
	{#if isFavorite}
		{@html starSolid}
		<span class="screen-reader-text">Remove from favorites</span>
	{:else}
		{@html starOutline}
		<span class="screen-reader-text">Add to favorites</span>
	{/if}
</button>

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		outline: none;
		color: var(--color-pink);
	}
</style>
