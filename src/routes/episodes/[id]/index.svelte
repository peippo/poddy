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

	export let data;
	export let title;
	$: items = data?.items;
</script>

<h1>{title} / Episodes</h1>

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
				<img src={item.image} alt="" />
				<p class="description">{stripTags(item.description)}</p>
			</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	.episode {
		border-top: 1px solid var(--color-dark-gray);
		padding: 2rem;
	}

	.details-row {
		display: flex;
		gap: 1rem;
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
</style>
