<script lang="ts">
	import { selectedLanguages, activeEpisode, isPlaying } from '$lib/store';
	import { playIcon, pauseIcon } from '$lib/icons';
	import { handleLoadEpisode } from '$lib/components/player.svelte';
	import RandomEpisodeLoader from './randomEpisodeLoader.svelte';

	async function fetchRandom() {
		const languages = $selectedLanguages.join(',');

		const response = await fetch(`/api/episodes/random?lang=${languages}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	const promise = fetchRandom();
</script>

{#await promise}
	<RandomEpisodeLoader />
{:then { episodes }}
	{#each episodes as episode}
		<article>
			{#if $activeEpisode?.id !== episode.id}
				<button class="play-button" on:click={() => handleLoadEpisode(episode.feedTitle, episode)}>
					{@html playIcon}
					<span class="screen-reader-text">Play episode {episode.title}</span>
				</button>
			{:else}
				<button class="play-button" on:click={() => ($isPlaying = !$isPlaying)}>
					{#if $isPlaying}
						{@html pauseIcon}
						<span class="screen-reader-text">Pause playback</span>
					{:else}
						{@html playIcon}
						<span class="screen-reader-text">Play episode {episode.title}</span>
					{/if}
				</button>
			{/if}

			<div class="content">
				<h2>{episode.feedTitle}</h2>
				<p class="title">{episode.title}</p>
			</div>
		</article>
	{/each}
{/await}

<style lang="scss">
	article {
		display: flex;
		align-items: center;
		text-align: left;
	}

	.play-button {
		appearance: none;
		background: transparent;
		margin: 0 1rem 0 0;
		padding: 0;
		border: 0;
		color: var(--color-pink);
		transition: color 0.2s ease-in-out;

		:global(svg) {
			width: 64px;
			height: 64px;
			margin-right: 0.5rem;
		}

		&:hover {
			cursor: pointer;
			color: #fff;
		}
	}

	h2 {
		margin: 0;
	}

	.title {
		margin: 0;
	}

	h2,
	.title {
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		@media (min-width: $medium-breakpoint) {
			max-width: 400px;
		}
	}
</style>
