<script lang="ts" context="module">
	export async function load({ params, fetch }) {
		const { id } = params;

		const response = await fetch(`/episodes/${id}/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script lang="ts">
	import { backIcon } from '$lib/icons';
	import EpisodeDetails from '$lib/components/episodeDetails.svelte';
	import type { EpisodesByFeedId, PodcastsByFeedId } from 'src/types/podcastIndex.type';

	interface PodcastDetailsWithEpisodes {
		podcast: PodcastsByFeedId;
		episodes: EpisodesByFeedId;
	}

	export let data: PodcastDetailsWithEpisodes;
	$: podcast = data?.podcast.feed;
	$: episodes = data?.episodes.items;
</script>

<div class="back-bar">
	<a class="back-link" href="/" sveltekit:prefetch>
		{@html backIcon}
		<span class="screen-reader-text">Back to listing</span>
	</a>
	<h1>{podcast.title} <span class="gray">/ Episodes</span></h1>
</div>

{#if episodes}
	{#each episodes as episode, index}
		<EpisodeDetails {index} podcastTitle={podcast.title} {episode} />
	{/each}
{/if}

<style lang="scss">
	.back-bar {
		position: sticky;
		top: 0;
		padding: 1rem 2rem 0.5rem;
		display: flex;
		align-items: flex-start;
		align-items: center;
		background-color: #161617;
		border-bottom: 1px solid var(--color-dark-gray);
		z-index: 5;
	}

	.back-link {
		color: var(--color-pink);
		margin-right: 1rem;
		margin-top: 0.5rem;
	}

	h1 {
		color: var(--color-light-gray);
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gray {
		color: var(--color-gray);

		@media (max-width: $medium-breakpoint) {
			display: none;
		}
	}
</style>
