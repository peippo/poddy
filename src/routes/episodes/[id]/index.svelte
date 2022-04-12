<script lang="ts" context="module">
	export async function load({ params, fetch, url }) {
		const { id } = params;
		const title = url.searchParams.get('title');

		const response = await fetch(`/episodes/${id}/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				title: title,
				data: response
			}
		};
	}
</script>

<script>
	import { activeEpisode, isPlaying } from '$lib/store';
	import { formatSeconds, stripTags } from '$lib/utils';
	import { handleLoadEpisode } from '$lib/components/player.svelte';
	import { playIcon, pauseIcon, backIcon } from '$lib/icons';

	export let data;
	export let title;
	$: episodes = data?.items;
</script>

<header>
	<a class="back-link" href="/">
		{@html backIcon}
		<span class="screen-reader-text">Back to listing</span>
	</a>
	<h1>{title} <span class="gray">/ Episodes</span></h1>
</header>

{#if episodes}
	{#each episodes as episode}
		<div class="episode">
			<div class="details-row">
				{#if episode.episode}
					Episode #{episode.episode}
				{/if}
				<p class="published">Published on {episode.datePublishedPretty}</p>
			</div>
			<h2>
				{episode.title}
				{#if episode.duration > 0}<span class="time">[{formatSeconds(episode.duration)}]</span>{/if}
			</h2>
			<div class="columns">
				{#if episode.image}
					<img src={episode.image} alt="" />
				{/if}

				<div>
					<p class="description">{stripTags(episode.description)}</p>

					{#if $activeEpisode?.id !== episode.id}
						<button class="play-button" on:click={() => handleLoadEpisode(title, episode)}>
							{@html playIcon}
							<span class="button-text">Play episode</span>
						</button>
					{:else}
						<button class="play-button" on:click={() => ($isPlaying = !$isPlaying)}>
							{#if $isPlaying}
								{@html pauseIcon}
								<span class="button-text">Pause episode</span>
							{:else}
								{@html playIcon}
								<span class="button-text">Play episode</span>
							{/if}
						</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	header {
		padding: 1rem 2rem 0.5rem;
		display: flex;
		align-items: flex-start;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.back-link {
		color: var(--color-pink);
		margin-right: 1rem;
		margin-top: 0.5rem;
	}

	h1 {
		color: var(--color-light-gray);
		margin: 0;
	}

	.gray {
		color: var(--color-gray);

		@media (max-width: $medium-breakpoint) {
			display: none;
		}
	}

	.episode {
		border-top: 1px solid var(--color-dark-gray);
		padding: 2rem;
	}

	.details-row {
		display: flex;
		flex-direction: column;

		@media (min-width: $small-breakpoint) {
			gap: 1rem;
			flex-direction: row;
		}
	}

	.published {
		margin-top: 0;
		margin-bottom: 0.25rem;
		color: var(--color-gray);
	}

	.columns {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.description {
		margin-top: 0;
		word-break: break-word;
	}

	img {
		max-width: 200px;

		@media (max-width: $medium-breakpoint) {
			display: none;
		}
	}

	h2 {
		margin-top: 0;
		color: var(--color-pink);
	}

	.time {
		color: var(--color-gray);
	}

	.play-button {
		appearance: none;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		font-size: 1rem;
		background: transparent;
		margin: 0 1rem 0 0;
		padding: 0;
		border: 0;
		color: var(--color-pink);
		transition: color 0.2s ease-in-out;

		&:hover {
			cursor: pointer;
			color: #fff;
		}
	}

	.button-text {
		margin-left: 1rem;
	}
</style>
