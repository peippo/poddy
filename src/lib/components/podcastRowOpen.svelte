<script lang="ts">
	import { selectedPodcastId } from '$lib/store';
	import { formatSeconds, stripTags } from '$lib/utils';
	import PodcastRowLoader from '$lib/components/podcastRowLoader.svelte';
	import Categories from '$lib/components/categories.svelte';
	import { handlePlayClick } from '$lib/components/player.svelte';

	async function fetchDetails() {
		const response = await fetch(`/podcasts/details/${$selectedPodcastId}`);
		const data = await response.json();

		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	const promise = fetchDetails();
</script>

{#await promise}
	<PodcastRowLoader />
{:then { details, episodes }}
	<article>
		<button class="close-button" on:click={() => ($selectedPodcastId = null)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32">
				<path
					fill="currentColor"
					d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
				/>
			</svg>
			<span class="screen-reader-text">Close details</span>
		</button>
		<div class="content">
			<header>
				<h2>{details.title}</h2>
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
							<li>
								<button
									class="play-button"
									on:click={() => handlePlayClick(details.title, episode)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										width="32"
										height="32"
									>
										<path
											fill="currentColor"
											d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"
										/>
									</svg>
								</button>
								<p>
									{episode.title}
									{#if episode.duration > 0}
										<span class="time">[{formatSeconds(episode.duration)}]</span>
									{/if}
								</p>
							</li>
						{/each}
					</ul>
					<a href="/episodes/{details.id}?title={details.title}">View all episodes</a>
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
		flex-direction: row-reverse;
		position: relative;
		border-top: 1px solid var(--color-pink);
		box-shadow: 0 0 30px rgb(0 0 0 / 50%);
		z-index: 5;
		background-color: #212329;

		@media (min-width: $medium-breakpoint) {
			flex-direction: row;
		}
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

	.close-button {
		appearance: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--color-dark-gray);
		color: var(--color-light-gray);
		border: 0;
		transition: color 0.2s ease-in-out;
		width: var(--row-button-width);

		&:hover {
			color: #fff;
			cursor: pointer;
		}
	}

	.content {
		padding: 2rem;
		width: calc(100% - var(--row-button-width));
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
