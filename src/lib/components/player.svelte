<script context="module" lang="ts">
	import { activeEpisode } from '$lib/store';

	export const handlePlayClick = (podcastTitle: string, episode) => {
		activeEpisode.set({
			podcastTitle: podcastTitle,
			episodeTitle: episode.title,
			duration: episode.duration,
			url: episode.enclosureUrl
		});
	};
</script>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let episode;

	$: status = 'Loading';
	$: playing = status === 'Playing';
</script>

<div class="background" in:fade out:fade>
	<section
		class="player"
		in:fly={{ y: 20, duration: 500, delay: 300 }}
		out:fly={{ y: 20, duration: 500 }}
	>
		<h2>
			{#if status}
				<span class:playing class="status-tag">{status}</span>
			{/if}
			{episode.podcastTitle}: <span class="episode-title">{episode.episodeTitle}</span>
		</h2>
		<audio
			on:play={() => (status = 'Playing')}
			on:pause={() => (status = 'Paused')}
			on:ended={() => (status = 'Ended')}
			controls
			autoplay
			src={episode.url}
		>
			Your browser does not support the
			<code>audio</code> element.
		</audio>

		<button class="close-button" on:click={() => ($activeEpisode = null)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path
					fill="currentColor"
					d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"
				/>
			</svg>
			<span class="screen-reader-text">Close player</span>
		</button>
	</section>
</div>

<style lang="scss">
	.background {
		position: fixed;
		width: 100%;
		height: 250px;
		bottom: 0;
		left: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.01));
		z-index: 10;
		pointer-events: none;
	}

	.player {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		width: calc(100% - 2rem);
		background-color: var(--color-blue-gray);
		border-radius: 40px;
		padding: 1rem;
		box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.75);
		pointer-events: auto;
	}

	.status-tag {
		font-size: 0.875rem;
		text-transform: uppercase;
		background-color: var(--color-light-gray);
		color: var(--color-black);
		margin-right: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 10px;

		&.playing {
			background-color: var(--color-pink);
		}
	}

	h2 {
		font-size: 1.1rem;
		display: flex;
		align-items: center;
		margin: 0 0 0.1rem;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		background: linear-gradient(to bottom, #6b7686, var(--color-blue-gray));
		border-top: 1px solid rgba(0, 0, 0, 0.3);
		padding: 1rem;
		border-radius: 30px 30px 0 0;

		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
			width: 150px;
			background: linear-gradient(to left, var(--color-blue-gray), rgba(133, 147, 166, 0.01));
		}
	}

	.episode-title {
		font-weight: normal;
		margin-left: 0.5rem;
	}

	audio {
		width: 100%;
	}

	.close-button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: -12px;
		right: 0;
		width: 42px;
		height: 42px;
		background: var(--color-black);
		border-radius: 1000px;
		border: 0;
		color: var(--color-pink);
		opacity: 0.9;

		&:hover {
			cursor: pointer;
			opacity: 1;
		}
	}
</style>
