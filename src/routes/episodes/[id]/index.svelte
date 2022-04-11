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
	import { formatSeconds, stripTags } from '$lib/utils';
	import { handlePlayClick } from '$lib/components/player.svelte';

	export let data;
	export let title;
	$: items = data?.items;
</script>

<header>
	<a class="back-link" href="/">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
			<path
				fill="currentColor"
				d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z"
			/>
		</svg>
		<span class="screen-reader-text">Back to listing</span>
	</a>
	<h1>{title} <span class="gray">/ Episodes</span></h1>
</header>

{#if items}
	{#each items as item}
		<div class="episode">
			<div class="details-row">
				{#if item.episode}
					Episode #{item.episode}
				{/if}
				<p class="published">Published on {item.datePublishedPretty}</p>
			</div>
			<h2>
				{item.title}
				{#if item.duration > 0}<span class="time">[{formatSeconds(item.duration)}]</span>{/if}
			</h2>
			<div class="columns">
				{#if item.image}
					<img src={item.image} alt="" />
				{/if}

				<div>
					<p class="description">{stripTags(item.description)}</p>

					<button class="play-button" on:click={() => handlePlayClick(title, item)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32">
							<path
								fill="currentColor"
								d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"
							/>
						</svg>
						Play episode
					</button>
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

		svg {
			margin-right: 1rem;
		}

		&:hover {
			cursor: pointer;
			color: #fff;
		}
	}
</style>
