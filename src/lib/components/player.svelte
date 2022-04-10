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
	export let episode;

	$: status = null;
	$: playing = status === 'Playing';
</script>

<div class="background">
	<section class="player">
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
</style>
