<script lang="ts">
	import RandomEpisode from '$lib/components/randomEpisode.svelte';
	import { logoOutlineSad } from '$lib/icons';
</script>

<main>
	<header>
		{@html logoOutlineSad}
		<div class="column">
			<h1>Sorry, no trending podcasts found!</h1>
			<p>
				Adjust <a href="/settings" sveltekit:prefetch>filter settings</a> or try this random episode
			</p>
			<RandomEpisode />
		</div>
	</header>
</main>

<style lang="scss">
	main {
		padding: 2rem;
		margin: 4rem 0 6rem;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;

		@media (min-width: $medium-breakpoint) {
			text-align: left;
			flex-direction: row;

			:global(svg) {
				margin-right: 2rem;
			}
		}

		:global(.tear) {
			color: var(--color-pink);
		}
	}

	h1 {
		margin: 2rem 0 0;
		color: var(--color-pink);

		@media (min-width: $medium-breakpoint) {
			margin: 0;
		}
	}

	p {
		margin: 0 0 3rem;
	}

	.column {
		display: flex;
		flex-direction: column;
	}
</style>
