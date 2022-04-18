<script>
	import { fade } from 'svelte/transition';
	import { logoOutline } from '$lib/icons';
	import { activeEpisode } from '$lib/store';
</script>

<footer class:extra-bottom-padding={$activeEpisode} in:fade={{ duration: 1000, delay: 1000 }}>
	{@html logoOutline}
	<p>
		<span class="light">poddy</span> [<strong>pod</strong>-ee] a hand-fed newborn lamb
	</p>
	<a href="https://github.com/peippo/poddy">Github</a>
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 3rem;
		color: var(--color-gray);

		a,
		p {
			font-size: 0.875rem;
		}

		p {
			margin-bottom: 0;
		}

		a {
			color: var(--color-blue-gray);
		}

		.light {
			color: var(--color-light-gray);
		}

		&.extra-bottom-padding {
			padding-bottom: calc(160px + 3rem);
		}
	}
</style>
