<script>
	import '../app.scss';
	import { activeEpisode } from '$lib/store';
	import { logo, settingsIcon } from '$lib/icons';
	import Player from '$lib/components/player.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<header>
	<div class="logo">
		<a href="/">
			{@html logo}
			<h1>poddy</h1>
			<span class="logo-sub">Trending<br /> podcasts</span>
		</a>
	</div>

	<a class="settings-link" href="/settings">
		{@html settingsIcon}
		<span>Settings</span>
	</a>
</header>

<slot />

<Footer />

{#if $activeEpisode}
	<Player episode={$activeEpisode} />
{/if}

<style lang="scss">
	.logo {
		display: flex;
		align-items: center;

		@media (min-width: $medium-breakpoint) {
			:global(svg) {
				width: 40px;
				height: 40px;
			}
		}
	}

	header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color-blue-gray);
		background: linear-gradient(
			140deg,
			var(--color-black),
			var(--color-blue-gray) 200px,
			var(--color-blue-gray)
		);
		color: var(--color-black);
		padding: 0.5rem 1.5rem 0.5rem 0.75rem;
		z-index: 15;
	}

	a {
		display: flex;
		align-items: center;
		text-decoration: none;

		&:hover {
			h1 {
				text-decoration-color: var(--color-light-gray);
			}
		}
	}

	h1 {
		margin: 0 0 0 0.5rem;
		color: #fff;
		text-decoration: underline;
		text-decoration-color: var(--color-pink);
		transition: all 0.2s ease-in-out;
		font-size: 1.9rem;
	}

	.logo-sub {
		color: var(--color-light-gray);
		display: inline-block;
		font-size: 12px;
		line-height: 1.2;
		margin-left: 0.5rem;
	}

	.settings-link {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: var(--font-family);
		font-size: 1rem;
		appearance: none;
		background-color: transparent;
		border: 0;
		color: var(--color-black);
		border-radius: 6px;

		:global(svg) {
			@media (min-width: $small-breakpoint) {
				margin-right: 0.5rem;
				width: 24px;
				height: 24px;
			}
		}

		&:hover {
			cursor: pointer;
		}

		&:focus {
			outline: 2px dotted var(--color-black);
			outline-offset: 2px;
		}

		&:focus:not(:focus-visible) {
			outline: none;
		}

		span {
			display: none;

			@media (min-width: $small-breakpoint) {
				display: inline-flex;
			}
		}
	}
</style>
