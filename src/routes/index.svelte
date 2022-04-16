<script lang="ts" context="module">
	import { selectedLanguages, selectedCategories } from '$lib/store';
	import { get } from 'svelte/store';

	export async function load({ fetch }) {
		const languages = get(selectedLanguages).join(',');
		const categories = get(selectedCategories).join(',');

		const response = await fetch(
			`/api/trending/__data.json?lang=${languages}&cat=${categories}`
		).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script lang="ts">
	import type { TrendingPodcasts } from 'src/types/podcastIndex.type';
	import { selectedPodcastId } from '$lib/store';

	import PodcastRowOpen from '$lib/components/podcastRowOpen.svelte';
	import PodcastRowClosed from '$lib/components/podcastRowClosed.svelte';

	export let data: TrendingPodcasts;
	$: feeds = data?.feeds;
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
