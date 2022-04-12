<script lang="ts">
	import { selectedPodcastId } from '$lib/store';
	import { stripTags } from '$lib/utils';
	import { plusIcon } from '$lib/icons';

	export let feed;
</script>

<article>
	<button on:click={() => ($selectedPodcastId = feed.id)}>
		{@html plusIcon}
		<span class="screen-reader-text">View {feed.title} details</span>
	</button>
	<div class="content">
		<header>
			<h2>{feed.title}</h2>
			<span class="author">{feed.author}</span>
		</header>

		<p>{stripTags(feed.description)}</p>
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: row-reverse;
		position: relative;
		border-top: 1px solid var(--color-dark-gray);
		height: var(--podcast-row-height);
		overflow: hidden;

		@media (min-width: $medium-breakpoint) {
			flex-direction: row;
		}
	}

	button {
		appearance: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--color-pink);
		border: 0;
		color: #fff;
		width: var(--row-button-width);
		transition: color 0.2s ease-in-out;

		&:hover {
			color: var(--color-dark-gray);
			cursor: pointer;
		}
	}

	.content {
		position: relative;
		padding: 1rem 2rem;
		width: calc(100% - var(--row-button-width));

		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			background: linear-gradient(to top, var(--color-black), rgba(0, 0, 0, 0));
		}
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	h2,
	.author {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h2 {
		margin: 0;
		color: var(--color-pink);
		flex: 2 1 auto;
	}

	.author {
		text-align: right;
		flex: 1 2 auto;
		min-width: 100px;

		@media (max-width: $medium-breakpoint) {
			display: none;
		}
	}

	p {
		margin: 0;
	}
</style>
