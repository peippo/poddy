<script lang="ts" context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/trending/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script>
	export let data;
	$: feeds = data?.feeds;

	$: console.log(feeds);
</script>

<h1>Trending podcasts</h1>

{#if feeds}
	{#each feeds as feed}
		<div class="podcast">
			<h2>{feed.title}</h2>
			<p>{feed.description}</p>
		</div>
	{/each}
{/if}
