<script lang="ts">
	import { fly } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { activeEpisode, isPlaying } from '$lib/store';
	import { formatSeconds, stripTags } from '$lib/utils';
	import Categories from '$lib/components/categories.svelte';
	import { handleLoadEpisode } from '$lib/components/player.svelte';
	import { playIcon, pauseIcon } from '$lib/icons';
	import FavoriteToggle from './favoriteToggle.svelte';

	export let id: number;

	async function fetchDetails() {
		const response = await fetch(`/api/podcasts/details/${id}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	const promise = fetchDetails();

	let isNavTransition = false;

	beforeNavigate(() => {
		isNavTransition = true;
	});
</script>

{#await promise then { details, episodes }}
	<article out:fly={{ y: isNavTransition ? 0 : 25, duration: isNavTransition ? 0 : 500 }}>
		<div class="content">
			<header>
				<div class="heading-row">
					<h2>{details.title}</h2>
					<FavoriteToggle id={details.id} />
				</div>
				{#if details.author && details.author !== details.title}
					<span class="author">{details.author}</span>
				{/if}
			</header>

			<div class="columns">
				<div>
					<p>{stripTags(details.description)}</p>

					<h3>Latest episodes</h3>
					<ul>
						{#each episodes as episode}
							<li class:active={$activeEpisode?.id === episode.id}>
								{#if $activeEpisode?.id !== episode.id}
									<button
										class="play-button"
										on:click={() => handleLoadEpisode(details.title, episode)}
									>
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

								<p>
									<span class="title">{episode.title}</span>
									{#if episode.duration > 0}
										<span class="time">[{formatSeconds(episode.duration)}]</span>
									{/if}
								</p>
							</li>
						{/each}
					</ul>
					<a href="/episodes/{details.id}" sveltekit:prefetch>View all episodes</a>
				</div>
				<div class="categories">
					<Categories categories={details.categories} />
				</div>
			</div>
		</div>
	</article>
{/await}

<style lang="scss">
	article {
		display: flex;
		position: relative;
		border-top: 1px solid var(--color-dark-gray);
		z-index: 5;
		background-color: #212329;
	}

	header {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;

		@media (min-width: $medium-breakpoint) {
			flex-direction: row;
		}
	}

	.content {
		padding: 2rem;
		width: 100%;
	}

	.heading-row {
		display: flex;
		align-items: flex-start;
		gap: 1rem;

		:global(svg) {
			@media (min-width: $medium-breakpoint) {
				width: 32px;
				height: 32px;
				align-items: center;
			}
		}
	}

	.author {
		text-align: right;
	}

	.columns {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;

		@media (min-width: $medium-breakpoint) {
			flex-direction: row;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style-type: none;
		margin: 0 0 2rem 0;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;

		.title {
			border-bottom: 1px dotted transparent;
			transition: border-bottom 0.5s;
		}

		&.active {
			.title {
				border-bottom: 1px dotted var(--color-pink);
			}
		}
	}

	.time {
		color: var(--color-gray);
	}

	.categories {
		min-width: 300px;
	}

	h2 {
		margin: 0;
		color: #fff;
	}

	p {
		margin: 0;
	}

	.play-button {
		appearance: none;
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
</style>
