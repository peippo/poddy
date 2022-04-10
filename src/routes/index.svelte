<script lang="ts" context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script>
	import { selectedPodcastId } from '$lib/store';

	import PodcastRowOpen from '$lib/components/podcastRowOpen.svelte';
	import PodcastRowClosed from '$lib/components/podcastRowClosed.svelte';

	export let data;
	$: feeds = data?.feeds;

	$: console.log(feeds);
</script>

{#if feeds}
	{#each feeds as feed}
		{#if feed.id === $selectedPodcastId}
			<PodcastRowOpen />
		{:else}
			<PodcastRowClosed {feed} />
		{/if}
	{/each}
{/if}
