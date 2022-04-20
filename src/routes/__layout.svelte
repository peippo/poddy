<script context="module" lang="ts">
	export async function load({ url }) {
		return {
			props: {
				key: url.pathname
			}
		};
	}
</script>

<script lang="ts">
	import '../app.scss';
	import { page } from '$app/stores';
	import { activeEpisode, isPlaying } from '$lib/store';
	import { fade } from 'svelte/transition';
	import { logo, settingsIcon, starSolid } from '$lib/icons';
	import Player from '$lib/components/player.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let key: string;

	$: isFavoritesActive = $page.routeId === 'favorites';
	$: isSettingsActive = $page.routeId === 'settings';
</script>

<svelte:head>
	{#if $activeEpisode && $isPlaying}
		<title>
			► {$activeEpisode.podcastTitle} - {$activeEpisode.episodeTitle}
		</title>
	{:else}
		<title>poddy: trending podcasts</title>
	{/if}
</svelte:head>

<header>
	<div class="logo">
		<a href="/" sveltekit:prefetch>
			{@html logo}
			<h1>
				poddy<span class="screen-reader-text">: </span><span class="logo-sub">
					trending<br /> podcasts</span
				>
			</h1>
		</a>
	</div>

	<nav>
		<a
			class="nav-link"
			href={isFavoritesActive ? `/` : `/favorites`}
			class:active={isFavoritesActive}
		>
			{@html starSolid}
			<span>Favorites</span>
		</a>

		<a class="nav-link" href={isSettingsActive ? `/` : `/settings`} class:active={isSettingsActive}>
			{@html settingsIcon}
			<span>Settings</span>
		</a>
	</nav>
</header>

{#key key}
	<div class="wrapper" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
		<slot />

		<Footer />
	</div>
{/key}

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
		padding: 0.5rem 0.75rem;
		z-index: 15;
	}

	h1 {
		font-weight: 700;
	}

	nav {
		display: flex;
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
		position: relative;
		display: inline-block;
		font-size: 12px;
		top: 2px;
		line-height: 1.2;
		margin-left: 0.5rem;
		font-weight: 400;
	}

	.nav-link {
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
		padding: 0.5rem 1rem;

		&.active {
			background-color: var(--color-light-gray);
			color: var(--color-black);
		}

		:global(svg) {
			@media (min-width: $small-breakpoint) {
				margin-right: 0.5rem;
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
			@media (max-width: $small-breakpoint) {
				border: 0;
				clip: rect(1px, 1px, 1px, 1px);
				clip-path: inset(50%);
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				width: 1px;
				word-wrap: normal !important;
			}
		}
	}
</style>
