<script lang="ts" context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/podcasts/trending/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script>
	import { truncateString } from '$lib/utils';

	export let data;
	$: feeds = data?.feeds;

	$: console.log(feeds);
</script>

<h1>Trending podcasts</h1>

{#if feeds}
	{#each feeds as feed}
		<div class="podcast">
			<h2><a href="podcast://{feed.url}">{feed.title}</a> ({feed.author})</h2>
			<p>{truncateString(feed.description, 100)}</p>
		</div>
	{/each}
{/if}
