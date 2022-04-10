<script>
	import '../app.scss';
	import { activeEpisode } from '$lib/store';
	import Player from '$lib/components/player.svelte';
</script>

<header>
	<div class="logo">
		<h1>poddy</h1>
		<span class="logo-sub">Trending<br /> podcasts</span>
	</div>
</header>

<slot />

{#if $activeEpisode}
	<Player episode={$activeEpisode} />
{/if}

<style lang="scss">
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
		padding: 0.5rem 1rem;
		z-index: 10;
	}

	.logo {
		display: flex;
		align-items: center;
	}

	h1 {
		margin: 0;
		color: #fff;
	}

	.logo-sub {
		color: var(--color-light-gray);
		display: inline-block;
		font-size: 12px;
		line-height: 1.2;
		margin-left: 0.5rem;
	}
</style>
