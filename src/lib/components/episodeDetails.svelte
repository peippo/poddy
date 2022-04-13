<script>
	import { activeEpisode, isPlaying } from '$lib/store';
	import { truncateString, formatSeconds, stripTags } from '$lib/utils';
	import { handleLoadEpisode } from '$lib/components/player.svelte';
	import { playIcon, pauseIcon } from '$lib/icons';

	export let podcastTitle;
	export let episode;

	$: description = stripTags(episode.description);
	$: descriptionExpanded = false;
	$: if (description.length < 500) {
		descriptionExpanded = true;
	}
</script>

<div class="episode">
	<div class="details-row">
		{#if episode.episode}
			Episode #{episode.episode}
		{/if}
		<p class="published">Published on {episode.datePublishedPretty}</p>
	</div>
	<h2>
		{episode.title}
		{#if episode.duration > 0}<span class="time">[{formatSeconds(episode.duration)}]</span>{/if}
	</h2>
	<div class="columns">
		{#if episode.image}
			<img src={episode.image} alt="" />
		{/if}

		<div>
			{#if descriptionExpanded}
				<p class="description">{description}}</p>
			{:else}
				<p class="description">{truncateString(description, 500)}</p>
				<button class="read-more-button" on:click={() => (descriptionExpanded = true)}
					><span class="icon" aria-hidden="true">+</span> Read more</button
				>
			{/if}

			{#if $activeEpisode?.id !== episode.id}
				<button class="play-button" on:click={() => handleLoadEpisode(podcastTitle, episode)}>
					{@html playIcon}
					<span class="button-text">Play episode</span>
				</button>
			{:else}
				<button class="play-button" on:click={() => ($isPlaying = !$isPlaying)}>
					{#if $isPlaying}
						{@html pauseIcon}
						<span class="button-text active">Pause episode</span>
					{:else}
						{@html playIcon}
						<span class="button-text active">Play episode</span>
					{/if}
				</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.episode {
		border-top: 1px solid var(--color-dark-gray);
		padding: 2rem;
	}

	.details-row {
		display: flex;
		flex-direction: column;

		@media (min-width: $small-breakpoint) {
			gap: 1rem;
			flex-direction: row;
		}
	}

	.published {
		margin-top: 0;
		margin-bottom: 0.25rem;
		color: var(--color-gray);
	}

	.columns {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.description {
		margin-top: 0;
		word-break: break-word;
	}

	.read-more-button {
		position: relative;
		font-family: var(--font-family);
		font-size: 1rem;
		background: transparent;
		border: none;
		padding: 0.5rem;
		margin: 0 0 1rem -0.5rem;
		color: var(--color-light-gray);

		.icon {
			font-size: 1.33rem;
			margin-right: 0.25rem;
			color: var(--color-gray);
		}

		&:hover {
			cursor: pointer;
			color: #fff;
		}

		&:after {
			content: '';
			position: absolute;
			left: calc(100% + 0.5rem);
			top: 50%;
			width: 200%;
			height: 1px;
			background-color: var(--color-gray);
			background: linear-gradient(to right, var(--color-gray), var(--color-black));
		}
	}

	img {
		max-width: 200px;

		@media (max-width: $medium-breakpoint) {
			display: none;
		}
	}

	h2 {
		margin-top: 0;
		color: var(--color-pink);
	}

	.time {
		color: var(--color-gray);
	}

	.play-button {
		appearance: none;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		font-size: 1rem;
		background: transparent;
		margin: 0 1rem 0 0;
		padding: 0;
		border: 0;
		color: var(--color-pink);
		transition: color 0.2s ease-in-out;

		&:hover {
			cursor: pointer;
			color: #fff;
		}
	}

	.button-text {
		margin-left: 1rem;
		border-bottom: 1px dotted transparent;
		transition: border-bottom 0.5s;

		&.active {
			border-bottom: 1px dotted var(--color-pink);
		}
	}
</style>
