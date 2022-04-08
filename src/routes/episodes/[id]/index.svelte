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

<script>
	import { truncateString, formatSeconds } from '$lib/utils';

	export let data;
	$: items = data?.items;

	$: console.log(data);
</script>

<h1>Episodes</h1>

{#if items}
	{#each items as item}
		<h2><a href={item.link}>{item.title}</a> ({formatSeconds(item.duration)})</h2>
		<p>{truncateString(item.description, 300)}</p>
	{/each}
{/if}
