<script lang="ts">
	import { selectedPodcastId } from '$lib/store';
	import PodcastRowLoader from '$lib/components/podcastRowLoader.svelte';
	import Categories from '$lib/components/categories.svelte';

	async function fetchDetails() {
		const response = await fetch(`/podcasts/details/${$selectedPodcastId}`);
		const data = await response.json();

		if (response.ok) {
			console.log('Podcast details: ', data);
			return data;
		} else {
			throw new Error(data);
		}
	}

	const promise = fetchDetails();
</script>

{#await promise}
	<PodcastRowLoader />
{:then { feed }}
	<article>
		<button on:click={() => ($selectedPodcastId = null)}>
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
				<h2>{feed.title}</h2>
				<span class="author">{feed.author}</span>
			</header>

			<p>{feed.description}</p>

			<Categories categories={feed.categories} />
		</div>
	</article>
{/await}

<style lang="scss">
	article {
		display: flex;
		position: relative;
		border-top: 1px solid var(--color-pink);
		box-shadow: 0 0 30px rgb(0 0 0 / 50%);
		z-index: 5;
		background-color: #212329;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	button {
		appearance: none;
		background: var(--color-dark-gray);
		color: var(--color-light-gray);
		border: 0;
		padding: 1rem;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: #fff;
			cursor: pointer;
		}
	}

	.content {
		padding: 2rem;
		width: 100%;
	}

	h2 {
		margin: 0;
		color: #fff;
	}

	p {
		margin: 0;
	}
</style>
